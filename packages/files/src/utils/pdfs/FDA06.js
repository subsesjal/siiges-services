/* eslint-disable new-cap */
const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
require('jspdf-autotable');
const {
  crearCelda, crearSeccion,
  agregarImagenYPaginaPie,
  configurarFuenteYAgregarTexto,
} = require('./pdfHandler');

const img1 = fs.readFileSync(path.join(__dirname, '/images/img1.png'), { encoding: 'base64' });
const img2 = fs.readFileSync(path.join(__dirname, '/images/img2.png'), { encoding: 'base64' });
const img3 = fs.readFileSync(path.join(__dirname, '/images/img3.png'), { encoding: 'base64' });

function GenerarFDA06(solicitud) {
  const doc = new jsPDF();
  let currentPositionY = 20;
  // Add header images
  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);
  doc.addImage(img1, 'JPEG', 0, 15, 70, 19);
  doc.addImage(img2, 'JPEG', 145, 15, 50, 16);

  doc.setFillColor(6, 98, 211);
  crearCelda(doc, 165, 40, 30, 7, 'FDA06');

  configurarFuenteYAgregarTexto(doc, 'bold', 12, [69, 133, 244], 'CARTA DECLARATORIA', 20, 60);
  currentPositionY += 20;
  // Main content section
  let content = `
  “Bajo protesta de decir verdad” declaro que el contenido programático de los planes y 
  programas de ${solicitud.programa.plantel.institucion.nombre}, son propiedad intelectual de ${solicitud.programa.nombre} 
  y no son del conocimiento público.
  `;
  currentPositionY += 30;
  configurarFuenteYAgregarTexto(doc, 'normal', 12, [0, 0, 0], '', 100, 58);
  currentPositionY += 30;
  configurarFuenteYAgregarTexto(doc, 'normal', 12, [0, 0, 0], content, 30, 70);
  content = 'BAJO PROTESTA DE DECIR VERDAD';
  currentPositionY += 35;
  currentPositionY = crearSeccion(currentPositionY, doc, content, 'center');
  content = `${solicitud.usuario.persona.nombre} ${solicitud.usuario.persona.apellidoPaterno} ${solicitud.usuario.persona.apellidoMaterno}`;
  currentPositionY += 5;
  crearSeccion(currentPositionY, doc, content, 'center');
  // Add footer image and page number
  agregarImagenYPaginaPie(doc, img3);

  const pdfDataUri = doc.output('arraybuffer');
  return pdfDataUri;
}

module.exports = { GenerarFDA06 };
