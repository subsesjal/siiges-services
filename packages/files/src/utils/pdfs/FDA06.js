const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');
const {
  crearCelda, crearSeccion,
  agregarImagenYPaginaPie,
  configurarFuenteYAgregarTexto,
  addNutmeg,
} = require('./pdfHandler');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img4.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img6.png'), { encoding: 'base64' });

function GenerarFDA06(solicitud) {
  const JsPDF = jsPDF;
  const doc = new JsPDF();
  addNutmeg(doc);
  let currentPositionY = 20;
  doc.addImage(img1, 'JPEG', 60, 9, 100, 23);

  doc.setFillColor(116, 200, 210);
  crearCelda(doc, 166, 40, 30, 7, 'FDA06', 10);

  configurarFuenteYAgregarTexto(doc, 'bold', 12, [116, 200, 210], 'CARTA DECLARATORIA', 20, 60);
  currentPositionY += 20;
  let content = `
  “Bajo protesta de decir verdad” declaro que el contenido programático de los planes y 
  programas de ${solicitud.programa.plantel.institucion.nombre}, son propiedad intelectual de ${solicitud.programa.nombre} 
  y no son del conocimiento público.
  `;
  const marginX = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - marginX * 2;
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  currentPositionY += 30;
  doc.text(content, marginX, currentPositionY, {
    maxWidth: contentWidth,
    align: 'justify',
  });
  content = 'BAJO PROTESTA DE DECIR VERDAD';
  currentPositionY += 35;
  currentPositionY = crearSeccion(currentPositionY, doc, content, 'center');
  content = `${solicitud.usuario.persona.nombre} ${solicitud.usuario.persona.apellidoPaterno} ${solicitud.usuario.persona.apellidoMaterno}`;
  currentPositionY += 5;
  crearSeccion(currentPositionY, doc, content, 'center');
  agregarImagenYPaginaPie(doc, img3);

  const pdfDataUri = doc.output('arraybuffer');
  return pdfDataUri;
}

module.exports = { GenerarFDA06 };
