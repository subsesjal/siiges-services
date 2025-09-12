const tipoExtension = [
  {
    mimeType: 'application/pdf',
    ext: '.pdf',
  },
  {
    mimeType: 'image/png',
    ext: '.png',
  },
  {
    mimeType: 'image/jpeg',
    ext: '.jpg, jpeg',
  },
  {
    mimeType: 'application/xml',
    ext: '.xml',
  },
  {
    mimeType: 'text/xml',
    ext: '.xml',
  },
  {
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ext: '.xlsx',
  },
  {
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ext: '.docx',
  },
  {
    mimeType: 'application/vnd.ms-excel',
    ext: '.xls',
  },
  {
    mimeType: 'application/msword',
    ext: '.doc',
  },
];

const maxFileSize = 5 * 1024 * 1024;

module.exports = { tipoExtension, maxFileSize };
