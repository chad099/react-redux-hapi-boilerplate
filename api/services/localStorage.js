/**
 * Created by deven on 26/10/16.
 */

"use strict";
//const AWS = require('aws-sdk');
//const config = require('config');
var fs = require('fs');
const uuid = require('uuid');
const config = require('config');

//AWS.config.update({accessKeyId: config.aws.accessKeyId, secretAccessKey: config.aws.secretAccessKey});
//const s3        = new AWS.S3();

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

    console.log('image property',ret);

    var path = config.profileImage.profileImagePath +'/'+ key;

    console.log(path);
    var file = fs.createWriteStream(path);

    file.on('error', function (err) {
        console.error(err)
    });

    uploadFile.pipe(file);

    uploadFile.on('end', function (err) {
        var ret = {
            filename: filename,
            key: key,
            contentType: contentType,
        };
        callback(null, ret);
    })


};
// Upload CSV file
exports.uploadCSVFile = (uploadFile, userId, callback) => {
  var date = new Date();
  var time = date.getTime();
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var csvFileName =day+'-'+monthIndex+'-'+year+'_'+time+'_USER_'+userId;
  var year=date.getFullYear();
  const filename  = uploadFile.hapi.filename;
  const extension = filename.substring(filename.lastIndexOf('.') + 1);
  const key       = `${csvFileName}.${extension}`;
  const contentType  =  uploadFile.hapi.headers['content-type'];

  var ret = {
    filename: key,
    contentType: contentType,
  };

  console.log('image property',ret);

  var path = config.csvFile.csvFilePath +'/'+ key;

  console.log(path);
  var file = fs.createWriteStream(path);

  file.on('error', function (err) {
    console.error(err)
  });

  uploadFile.pipe(file);

  uploadFile.on('end', function (err) {
    var ret = {
      filename: key,
      contentType: contentType,
    };
    callback(null, ret);
  })

};

