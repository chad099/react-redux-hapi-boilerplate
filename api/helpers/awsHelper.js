const AWS = require('aws-sdk');
const config = require('config');

const env = process.env.NODE_ENV || 'development';

AWS.config.update({ region: 'us-east-1' });

if ( env === 'development') {
  AWS.config.update({ accessKeyId: config.aws.accessKeyId, secretAccessKey: config.aws.secretAccessKey });
}

exports.ses = new AWS.SES();

exports.s3 = new AWS.S3({ signatureVersion: 'v4' });
