const express = require('express');
const router = express.Router();
const { s3 } = require('../utils/s3');
const dotenv = require('dotenv');
dotenv.config();

// GET /api/drive/download?key=<s3-object-key>
// Streams an S3 object back to the caller so it can be saved to a local PC.
router.get('/download', (req, res) => {
  const { key } = req.query;

  if (!key) {
    return res.status(400).json({ error: 'Missing required query parameter: key' });
  }

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  };

  s3.headObject(params, (headErr) => {
    if (headErr) {
      if (headErr.statusCode === 404) {
        return res.status(404).json({ error: 'File not found' });
      }
      console.error('S3 headObject error:', headErr);
      return res.status(500).json({ error: 'Failed to locate file' });
    }

    const rawName = key.split('/').pop();
    // Strip characters that could break the Content-Disposition header or enable injection
    const fileName = rawName.replace(/[^\w.\-]/g, '_');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    const stream = s3.getObject(params).createReadStream();

    stream.on('error', (err) => {
      console.error('S3 stream error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to download file' });
      }
    });

    stream.pipe(res);
  });
});

// GET /api/drive/list?prefix=<optional-prefix>
// Lists objects in the S3 bucket (optionally filtered by prefix).
router.get('/list', (req, res) => {
  const { prefix } = req.query;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    ...(prefix ? { Prefix: prefix } : {}),
  };

  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.error('S3 listObjectsV2 error:', err);
      return res.status(500).json({ error: 'Failed to list files' });
    }

    const files = (data.Contents || []).map((obj) => ({
      key: obj.Key,
      size: obj.Size,
      lastModified: obj.LastModified,
    }));

    return res.json({ files });
  });
});

module.exports = router;
