// External dependencies
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const { config } = require('../../../config/environment');

const generateMapObservaciones = (dataParsed, template) => {
  if (template === 'observacionSolicitud') {
    const { observacion } = dataParsed;
    const mapObservaciones = observacion.map((dato) => {
      const { nombre, observaciones } = dato;
      return `<tr><td style="border: 1px solid #ddd;padding: 8px;">${nombre}</td><td style="border: 1px solid #ddd;padding: 8px;">${observaciones}</td></tr>`;
    });
    const newDataParsed = dataParsed;
    newDataParsed.observacion = mapObservaciones.join('');
  }
};

const sendEmail = async ({
  email, asunto, template, data,
}) => {
  const dataParsed = JSON.parse(data);
  generateMapObservaciones(dataParsed, template);
  const templatePath = path.join(__dirname, 'templates', `${template}.html`);
  const templateContent = fs.readFileSync(templatePath, 'utf8');

  // Replace the placeholders in the template with the provided data
  let emailHtml = templateContent;
  Object.keys(dataParsed).forEach((param) => {
    let value = dataParsed[param];
    // Replace newline characters with HTML break tag
    if (typeof value === 'string') {
      value = value.replace(/\n/g, '<br/>');
    }
    emailHtml = emailHtml.replace(`{${param}}`, value);
  });

  // Define email message
  const mailOptions = {
    from: 'SIIGES Jalisco <noreplysiiges.sicyt@jalisco.gob.mx>',
    to: email,
    subject: asunto,
    html: emailHtml,
  };

  const transporter = nodemailer.createTransport({
    service: config.serviceEmail,
    host: 'smtp.jalisco.gob.mx',
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
