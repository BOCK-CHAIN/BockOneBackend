// api/storeFileMessage.js (DEFINITIVE VERSION 5.0)
// api/storeFileMessage.js (JWT Refactored)
const { IncomingForm } = require('formidable');
const fs = require('fs/promises');
const path = require('path');
const AWS = require('aws-sdk');
const pool = require('./_utils/db');

function getFolderForFile(file) {
    if (file.mimetype) {
        if (file.mimetype.startsWith('video/')) return 'video';
        if (file.mimetype.startsWith('audio/')) return 'audio';
        if (file.mimetype.startsWith('image/')) return 'image';
    }
    if (file.originalFilename) {
        const extension = file.originalFilename.split('.').pop().toLowerCase();
        const docExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'csv'];
        if (docExtensions.includes(extension)) return 'documents';
    }
    return 'other';
}

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

function hasS3Config() {
    return Boolean(
        process.env.AWS_ACCESS_KEY_ID &&
        process.env.AWS_SECRET_ACCESS_KEY &&
        process.env.AWS_REGION &&
        process.env.S3_BUCKET_NAME
    );
}

function safeSegment(value) {
    return String(value || '')
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, '_')
        .replace(/^_+|_+$/g, '');
}

function safeFileName(value) {
    const base = path.basename(String(value || 'file'));
    return base.replace(/[^a-zA-Z0-9._-]+/g, '_');
}

function getBaseUrl(req) {
    const configured = process.env.PUBLIC_BASE_URL;
    if (configured && configured.trim()) return configured.trim();
    return `${req.protocol}://${req.get('host')}`;
}

module.exports = async (req, res) => {
    const userEmail = req.user.email; // Get email securely from the token.
    const userName = req.user.name;

    const form = new IncomingForm();
    let client;

    try {
        const [fields, files] = await form.parse(req);
        
        const messageText = fields.message?.[0] || '';
        const uploadedFile = files.file?.[0];

        if (!uploadedFile) {
            return res.status(400).json({ error: 'File is required.' });
        }

        const fileBuffer = await fs.readFile(uploadedFile.filepath);
        const existingSessionId = fields.sessionId?.[0] ? parseInt(fields.sessionId[0], 10) : null;
        let currentSessionId = existingSessionId;

        client = await pool.connect();
        await client.query('BEGIN');

        await client.query(
            'INSERT INTO users (email, name, password) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING',
            [userEmail, userName, 'placeholder_password_not_used']
        );
        
        if (!currentSessionId) {
            const newSessionResult = await client.query(
                "INSERT INTO chat_sessions (user_email, title) VALUES ($1, $2) RETURNING id",
                [userEmail, `Chat with ${uploadedFile.originalFilename}`]
            );
            currentSessionId = newSessionResult.rows[0].id;
        }

        const fileTypeFolder = getFolderForFile(uploadedFile);
        const safeUser = safeSegment(userEmail) || 'user';
        const fileName = `${Date.now()}_${safeFileName(uploadedFile.originalFilename)}`;
        let fileUrl;

        if (hasS3Config()) {
            const s3Key = `${safeUser}/${fileTypeFolder}/${fileName}`;
            const uploadParams = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: s3Key,
                Body: fileBuffer,
                ContentType: uploadedFile.mimetype
            };
            const s3Data = await s3.upload(uploadParams).promise();
            fileUrl = s3Data.Location;
        } else {
            const uploadsRoot = path.resolve(__dirname, '..', 'uploads');
            const diskDir = path.join(uploadsRoot, safeUser, fileTypeFolder);
            await fs.mkdir(diskDir, { recursive: true });
            const diskPath = path.join(diskDir, fileName);
            await fs.writeFile(diskPath, fileBuffer);

            const publicPath = [
                'uploads',
                safeUser,
                fileTypeFolder,
                fileName
            ].map(encodeURIComponent).join('/');

            fileUrl = `${getBaseUrl(req)}/${publicPath}`;
        }

        const messageQuery = `
          INSERT INTO chat_history (user_email, message, sender, session_id, file_url, file_type) 
          VALUES ($1, $2, 'user', $3, $4, $5) RETURNING *
        `;
        const values = [userEmail, messageText, currentSessionId, [fileUrl], [uploadedFile.mimetype]];
        const { rows } = await client.query(messageQuery, values);

        await client.query('COMMIT');
        return res.status(201).json(rows[0]);

    } catch (error) {
        if (client) await client.query('ROLLBACK');
        console.error('Error in storeFileMessage:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (client) client.release();
    }
};
