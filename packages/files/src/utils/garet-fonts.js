const fs = require('fs');
const path = require('path');

const GaretRegular = fs.readFileSync(path.resolve(__dirname, '../../../../fonts/Garet-Regular.ttf')).toString('base64');
const GaretBold = fs.readFileSync(path.resolve(__dirname, '../../../../fonts/Garet-Bold.ttf')).toString('base64');

function addGaretFonts(doc) {
  // Regular
  doc.addFileToVFS('Garet-Regular.otf', GaretRegular);
  doc.addFont('Garet-Regular.otf', 'Garet', 'normal');

  // Bold
  doc.addFileToVFS('Garet-Bold.otf', GaretBold);
  doc.addFont('Garet-Bold.otf', 'Garet', 'bold');
}

module.exports = { addGaretFonts };
