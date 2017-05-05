"use strict";
const AWS = require('aws-sdk');
const config = require('config');
const uuid = require('uuid');

AWS.config.update({accessKeyId: config.aws.accessKeyId, secretAccessKey: config.aws.secretAccessKey});
const s3        = new AWS.S3();
exports.uploadFile = (uploadFile, callback) => {
  
  const filename  = uploadFile.hapi.filename;
  const extension = filename.substring(filename.lastIndexOf('.') + 1);
  const key       = `${uuid.v4()}.${extension}`;
  const contentType  =  uploadFile.hapi.headers['content-type'];


  var ret = {
    filename: filename,
    key: key,
    contentType: contentType,
  };

  var params = {                              // get required params
    Bucket: config.aws.s3BucketName,
    Key: key,
    Body: uploadFile._data,
    ContentType: contentType,
  };

  s3.putObject(params, function (err, pres) {       // store file on the cloud
    if (err) {
      return callback(err);
    }
    callback(null, ret);
  });
};

exports.readFile = (key, callback) => {
    var params = {
    Bucket: config.aws.s3BucketName, /* required */
    Key: key,                       /* required */
  };
  s3.getObject(params, function(err, data) {
    if (err)
    {
      return callback(err);
    }
    callback(null, { contentType: 'image/jpeg', content: data.Body });
  });

};
