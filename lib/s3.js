const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  CopyObjectCommand,
  HeadObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { Upload } = require('@aws-sdk/lib-storage');
const logger = require('./logger');

// S3 Client singleton
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET = process.env.AWS_S3_BUCKET;
const CLOUDFRONT_URL = process.env.CLOUDFRONT_URL;

/**
 * Upload a file stream or buffer to S3
 */
const uploadFile = async ({ key, body, contentType, metadata = {} }) => {
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      Metadata: metadata,
    },
  });

  upload.on('httpUploadProgress', (progress) => {
    logger.debug('S3 upload progress', { key, progress });
  });

  const result = await upload.done();
  const cloudFrontUrl = getCloudfrontUrl(key);

  return { key, cloudFrontUrl, etag: result.ETag };
};

/**
 * Generate a presigned URL for downloading a file (default 1 hour)
 */
const getPresignedDownloadUrl = async (key, expiresInSeconds = 3600) => {
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
  return getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
};

/**
 * Generate a presigned URL for uploading directly from the client
 */
const getPresignedUploadUrl = async (key, contentType, expiresInSeconds = 900) => {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
};

/**
 * Delete a file from S3
 */
const deleteFile = async (key) => {
  await s3Client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
  logger.info('S3 file deleted', { key });
};

/**
 * Copy a file within S3 (used for versioning)
 */
const copyFile = async (sourceKey, destinationKey) => {
  await s3Client.send(
    new CopyObjectCommand({
      Bucket: BUCKET,
      CopySource: `${BUCKET}/${sourceKey}`,
      Key: destinationKey,
    })
  );
  return destinationKey;
};

/**
 * Check if a file exists in S3
 */
const fileExists = async (key) => {
  try {
    await s3Client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch {
    return false;
  }
};

/**
 * Build a CloudFront URL from an S3 key
 */
const getCloudfrontUrl = (key) => {
  if (!key) return null;
  if (CLOUDFRONT_URL) return `https://${CLOUDFRONT_URL}/${key}`;
  return `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

/**
 * Build the S3 key for a user file
 * Pattern: users/{userId}/files/{fileId}/{filename}
 */
const buildFileKey = (userId, fileId, filename) => {
  return `users/${userId}/files/${fileId}/${filename}`;
};

/**
 * Build an S3 key for a file version
 */
const buildVersionKey = (userId, fileId, versionNumber, filename) => {
  return `users/${userId}/files/${fileId}/versions/v${versionNumber}/${filename}`;
};

/**
 * Build the S3 key for an avatar
 */
const buildAvatarKey = (userId, filename) => {
  return `users/${userId}/avatar/${filename}`;
};

module.exports = {
  s3Client,
  uploadFile,
  getPresignedDownloadUrl,
  getPresignedUploadUrl,
  deleteFile,
  copyFile,
  fileExists,
  getCloudfrontUrl,
  buildFileKey,
  buildVersionKey,
  buildAvatarKey,
  BUCKET,
};
