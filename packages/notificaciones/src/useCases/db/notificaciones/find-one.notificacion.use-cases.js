const path = require('path');
const fs = require('fs');
const { checkers } = require('@siiges-services/shared');
const templateHelper = require('../../helpers');

const ADD_DETAILS_MAPPING = {
  observacionSolicitud: templateHelper.generateMapObservaciones,
  folioDocumentosAlumnos: templateHelper.generateMapFoliosAlumnos,
};

const findOneNotificaciones = (
  findNotificationQuery,
  updateNotificationQuery,
) => async ({ id }) => {
  const getNotification = await findNotificationQuery({ id });
  checkers.throwErrorIfDataIsFalsy(getNotification, 'Notificacion', id);

  const response = getNotification;
  let newStatus = response.status;

  if (newStatus !== 'OPENED') {
    await updateNotificationQuery({ id }, { status: 'OPENED' });
    newStatus = 'OPENED';
  }

  const templateName = response.template;
  let dataParsed = JSON.parse(response.data);

  const detailMapping = ADD_DETAILS_MAPPING[templateName];
  if (detailMapping) {
    dataParsed = detailMapping(dataParsed);
  }

  const templatePath = path.join(__dirname, '..', '..', 'services', 'templates', `${templateName}.html`);

  const templateContent = fs.readFileSync(templatePath, 'utf8');

  let emailHtml = templateContent;
  Object.entries(dataParsed).forEach(([param, value]) => {
    let replacedValue = value;
    if (typeof value === 'string') {
      replacedValue = value.replace(/\n/g, '<br/>');
    }
    const regex = new RegExp(`{${param}}`, 'g');
    emailHtml = emailHtml.replace(regex, replacedValue);
  });

  // con  ...response.get({ plain: true }), convertimos la instancia en unobjeto plano
  return {
    ...response.get({ plain: true }),
    status: newStatus,
    emailHtml,
  };
};

module.exports = { findOneNotificaciones };
