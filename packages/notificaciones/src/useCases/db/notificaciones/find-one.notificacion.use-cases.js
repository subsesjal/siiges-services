const path = require('path');
const fs = require('fs');
const { checkers } = require('@siiges-services/shared');
const { addDetailsHtml } = require('../../utils/add-template-html');

const findOneNotificaciones = (
  findNotificationQuery,
  updateNotificationQuery,
) => async ({ id }) => {
  const getNotification = await findNotificationQuery({ id });
  checkers.throwErrorIfDataIsFalsy(getNotification, 'Notificacion', id);

  const response = getNotification.toJSON();
  let newStatus = response.status;

  if (newStatus !== 'OPENED') {
    await updateNotificationQuery({ id }, { status: 'OPENED' });
    newStatus = 'OPENED';
  }

  const templateName = response.template;
  let dataParsed = JSON.parse(response.data);
  dataParsed = addDetailsHtml(dataParsed, templateName);

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

  return {
    ...response,
    status: newStatus,
    emailHtml,
  };
};

module.exports = { findOneNotificaciones };
