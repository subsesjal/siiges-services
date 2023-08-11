// External dependencies
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const { config } = require('../../../config/environment');

const sendEmail = async ({
  email, asunto, template, data,
}) => {
  const dataParsed = JSON.parse(data);
  const templatePath = path.join(__dirname, 'templates', `${template}.html`);
  const templateContent = fs.readFileSync(templatePath, 'utf8');

  // Replace the placeholders in the template with the provided data
  let emailHtml = templateContent;
  Object.keys(dataParsed).forEach((param) => {
    emailHtml = emailHtml.replace(`{${param}}`, dataParsed[param]);
  });

  // Define email message
  const mailOptions = {
    from: 'email@gmail.com',
    to: email,
    subject: asunto,
    html: emailHtml,
  };

  const transporter = nodemailer.createTransport({
    service: config.serviceEmail,
    auth: {
      user: config.userEmail,
      pass: config.passwordEmail,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    return {
      statusCode: 500,
      error,
    };
  }
};

module.exports = sendEmail;
