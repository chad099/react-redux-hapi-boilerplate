const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');
const EmailTemplate = require('email-templates').EmailTemplate;

const logger = require('../helpers/logHelper');
const ses = require('../helpers/awsHelper').ses;
const config = require('config');
//For production sesTransport({ ses })
const transporter = nodemailer.createTransport(config.emailUrl.host);

const internals = {};

const FROM_EMAIL = 'no-reply@simsaw.com';

exports.send = (to, subject, model, templateDir) =>
  new Promise((resolve, reject) => {
    internals
      .emailTemplate({ subject, model }, templateDir)
      .then((template) => internals.sendEmail(FROM_EMAIL, to, subject, model, template.html))
      .then(resolve)
      .catch(err => {
        logger.error(err);
        console.log('This is error', err);
        reject('Unable to send email');
      });
  });

// === INTERNALS ===
internals.emailTemplate = (context, templateDir) => new Promise((resolve, reject) => {
  const template = new EmailTemplate(templateDir);
  template.render(context, (err, result) => {
    if (err) {
      return reject(err);
    }

    resolve(result);
  });
});

internals.sendEmail = (from, to, subject, model, bodyHtml) => {
  const mailOptions = { from, to, subject, html: bodyHtml };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return reject(err);
      }
      resolve(info.response);
    });
  });
};
