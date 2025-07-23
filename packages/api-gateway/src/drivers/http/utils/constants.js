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
];

const maxFileSize = 3 * 1024 * 1024;

module.exports = { tipoExtension, maxFileSize };
