const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
dotenv.config();

const s3 = new AWS.S3({
  // If you move to EC2 IAM role, you can omit accessKeyId/secretAccessKey.
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const cdnBase = (process.env.CLOUDFRONT_URL || '').replace(/\/+$/, '');

const buildCdnUrl = (key) => `${cdnBase}/${encodeURI(key)}`;

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET,
    // ❌ Remove ACL – bucket owner enforced + OAC doesn't allow ACLs
    // acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    cacheControl: 'public, max-age=31536000, immutable',
    key: function (req, file, cb) {
      const safeName = file.originalname.replace(/\s+/g, '_');
      cb(null, `profiles/${Date.now()}_${safeName}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB, adjust as you like
});

module.exports = { upload, s3, buildCdnUrl };
