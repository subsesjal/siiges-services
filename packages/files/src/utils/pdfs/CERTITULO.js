const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
const QRCode = require('qrcode');
const { addNutmeg } = require('./pdfHandler');

const imgCertificadoFondo = fs.readFileSync(
  path.join(__dirname, '/images/imgCertificadoFondo.png'),
  { encoding: 'base64' },
);

async function agregarQR(doc, certificado, yBase) {
  const urlFront = process.env.BASE_URL_FRONT || 'https://siiges.jalisco.gob.mx';
  const url = `${urlFront}/certificado/${certificado?.folioControl}/consultarFolio`;

  const qrDataUrl = await QRCode.toDataURL(url, {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 1,
    margin: 1,
    width: 128,
  });

  const qrSize = 130;
  const pageWidth = doc.internal.pageSize.getWidth();
  const qrX = pageWidth - qrSize - 60;
  const qrY = yBase + 20;
  doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);
}

async function GenerarCertificado(certificado, xmlString) {
  const JsPDF = jsPDF;
  const doc = new JsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
  addNutmeg(doc);

  doc.addImage(
    imgCertificadoFondo,
    'PNG',
    0,
    0,
    doc.internal.pageSize.getWidth(),
    doc.internal.pageSize.getHeight(),
  );
  doc.setTextColor(0, 0, 0);
  doc.setFont('Nutmeg', 'normal');

  const centerText = (text, y, size = 10, bold = false) => {
    if (!text) return;
    doc.setFont('Nutmeg', bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    doc.text(text, doc.internal.pageSize.getWidth() / 2, y, { align: 'center' });
  };

  const leftText = (text, x, y, size = 9, bold = false) => {
    doc.setFont('Nutmeg', bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    doc.text(text, x, y);
  };

  const rightText = (text, x, y, size = 9, bold = false) => {
    doc.setFont('Nutmeg', bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    doc.text(text, x, y, { align: 'right' });
  };

  const checkNewPage = (yPos, marginBottom = 80) => {
    if (yPos > doc.internal.pageSize.getHeight() - marginBottom) {
      doc.addPage();
      doc.addImage(
        imgCertificadoFondo,
        'PNG',
        0,
        0,
        doc.internal.pageSize.getWidth(),
        doc.internal.pageSize.getHeight(),
      );
      return 100;
    }
    return yPos;
  };

  centerText('SECRETARÍA DE EDUCACIÓN DEL ESTADO DE JALISCO', 70, 11, true);
  centerText('CERTIFICADO DE TERMINACIÓN DE ESTUDIOS', 85, 10, true);
  centerText('EDUCACIÓN INTENSIVA', 100, 10, true);

  doc.setFontSize(7);
  const textoIntro = `El plantel educativo ${certificado?.nombrePlantel?.toUpperCase() || ''} ubicado en ${certificado?.municipio || ''}, Jalisco, con Clave de Centro de Trabajo ${certificado?.cct || ''} con clave de RVOE ${certificado?.rvoe || ''}, CERTIFICA que`;
  const lineasIntro = doc.splitTextToSize(textoIntro, 470);
  doc.text(lineasIntro, 57, 140);

  let yAlumno = 140 + lineasIntro.length * 10 + 15;
  doc.setFont('Nutmeg', 'bold');
  doc.setFontSize(11);
  centerText(certificado?.nombreAlumno?.toUpperCase() || '', yAlumno, 11, true);

  yAlumno += 18;
  doc.setFont('Nutmeg', 'normal');
  doc.setFontSize(7);
  const textoAlumno = `Con Clave Única de Registro de Población ${certificado?.curp || ''} y número de matrícula ${certificado?.matricula || ''} acreditó totalmente las ${certificado?.totalAsignaturas || ''} asignaturas que comprende el plan de estudios vigente del bachillerato intensivo semiescolarizado.`;
  const lineasAlumno = doc.splitTextToSize(textoAlumno, 470);
  doc.text(lineasAlumno, 57, yAlumno);

  let y = yAlumno + 40;
  const tablaX = 57;
  const tablaAncho = 500;
  const mitad = tablaX + tablaAncho / 2;

  for (const ciclo of certificado.ciclos || []) {
    y = checkNewPage(y);

    doc.setFont('Nutmeg', 'bold');
    doc.setFontSize(9);
    centerText(`CICLO ${ciclo.cicloNombre}`, y, 9, true);
    y += 15;

    doc.setLineWidth(0.5);
    doc.line(tablaX, y, tablaX + tablaAncho, y);
    leftText('ASIGNATURAS', tablaX + 5, y + 12, 8, true);
    rightText('CALIF. FINAL', mitad - 10, y + 12, 8, true);
    leftText('ASIGNATURAS', mitad + 5, y + 12, 8, true);
    rightText('CALIF. FINAL', tablaX + tablaAncho - 10, y + 12, 8, true);
    doc.line(tablaX, y + 16, tablaX + tablaAncho, y + 16);
    y += 30;

    const materias = ciclo.asignaturas || [];
    const mitadAsignaturas = Math.ceil(materias.length / 2);
    const col1 = materias.slice(0, mitadAsignaturas);
    const col2 = materias.slice(mitadAsignaturas);

    const maxFilas = Math.max(col1.length, col2.length);

    doc.setFont('Nutmeg', 'normal');
    doc.setFontSize(8);

    for (let i = 0; i < maxFilas; i++) {
      y = checkNewPage(y);
      const currentY = y;

      if (col1[i]) {
        leftText(col1[i].nombre || '', tablaX + 5, currentY);
        rightText(col1[i].calificacion?.toString() || '', mitad - 10, currentY);
      }
      if (col2[i]) {
        leftText(col2[i].nombre || '', mitad + 5, currentY);
        rightText(col2[i].calificacion?.toString() || '', tablaX + tablaAncho - 10, currentY);
      }

      y += 12;
    }

    y += 20;
  }

  y = checkNewPage(y + 10);
  centerText(`PROMEDIO GENERAL: ${certificado?.promedioGeneral || ''}`, y, 10, true);

  const firmaY = y + 60;
  leftText('DIRECTOR DEL PLANTEL', 57, firmaY, 8);
  leftText(certificado?.director || '', 57, firmaY + 12, 8, true);

  await agregarQR(doc, certificado, y);

  const pieY = doc.internal.pageSize.getHeight() - 60;
  doc.setFontSize(6);
  doc.text('Este documento tiene validez oficial. Puede verificarse en:', 57, pieY - 10);
  doc.text('https://siiges.jalisco.gob.mx', 57, pieY);
  rightText(`Folio CTE: ${certificado?.folioControl || ''}`, doc.internal.pageSize.getWidth() - 57, pieY);

  doc.addPage();
  doc.setFontSize(8);
  doc.setFont('Nutmeg', 'normal');
  doc.setTextColor(150);
  const maxXmlWidth = doc.internal.pageSize.getWidth() - 114;
  if (xmlString) {
    const xmlLines = doc.splitTextToSize(xmlString, maxXmlWidth);
    doc.text(xmlLines, 57, 80);
  }

  return doc.output('arraybuffer');
}

module.exports = { GenerarCertificado };
