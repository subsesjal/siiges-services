const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
const QRCode = require('qrcode');
const { addNutmeg } = require('./pdfHandler');

const imgCertificadoFondo = fs.readFileSync(
  path.join(__dirname, '/images/imgCertificadoFondo.png'),
  { encoding: 'base64' },
);

async function generarQR(url) {
  return QRCode.toDataURL(url, {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 1,
    margin: 1,
    width: 120,
  });
}

async function GenerarCertificado(certificado) {
  const JsPDF = jsPDF;
  const doc = new JsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
  addNutmeg(doc);

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  doc.addImage(imgCertificadoFondo, 'PNG', 0, 0, width, height);
  doc.setTextColor(0, 0, 0);
  doc.setFont('Nutmeg', 'normal');

  const drawText = ({
    text,
    x = 0,
    y = 0,
    size = 9,
    bold = false,
    align = 'left',
    width: boxWidth = 470,
  }) => {
    if (!text) return;
    const safeText = String(text);
    doc.setFont('Nutmeg', bold ? 'bold' : 'normal');
    doc.setFontSize(size);

    const lines = doc.splitTextToSize(safeText, boxWidth);
    let currentY = y;
    if (align === 'center') {
      lines.forEach((line) => {
        const lineWidth = doc.getTextWidth(line);
        const centeredX = (width - lineWidth) / 2;
        doc.text(line, centeredX, currentY);
        currentY += size + 2;
      });
      return;
    }

    if (['left', 'right'].includes(align)) {
      doc.text(lines, x, y, { align });
      return;
    }

    if (align === 'justify' && boxWidth) {
      lines.forEach((line) => {
        const words = line.split(' ');
        if (words.length === 1) {
          doc.text(line, x, currentY);
        } else {
          const textWidth = doc.getTextWidth(line);
          const spaceCount = words.length - 1;
          const spaceWidth = (boxWidth - textWidth) / spaceCount;
          let cursor = x;
          words.forEach((word, i) => {
            doc.text(word, cursor, currentY);
            if (i < words.length - 1) cursor += doc.getTextWidth(word) + spaceWidth;
          });
        }
        currentY += size + 1;
      });
    }
  };

  const checkNewPage = (yPos, marginBottom = 100) => {
    if (yPos > height - marginBottom) {
      doc.addPage();
      doc.addImage(imgCertificadoFondo, 'PNG', 0, 0, width, height);
      return 100;
    }
    return yPos;
  };

  drawText({
    text: 'SECRETARÍA DE EDUCACIÓN DEL ESTADO DE JALISCO',
    y: 70,
    x: width / 2,
    size: 11,
    bold: true,
    align: 'center',
  });
  drawText({
    text: 'CERTIFICADO DE TERMINACIÓN DE ESTUDIOS',
    y: 85,
    x: width / 2,
    size: 10,
    bold: true,
    align: 'center',
  });
  drawText({
    text: 'EDUCACIÓN INTENSIVA',
    y: 100,
    x: width / 2,
    size: 10,
    bold: true,
    align: 'center',
  });

  doc.setFontSize(7);
  const textoIntro = `El plantel educativo ${certificado?.nombrePlantel?.toUpperCase() || ''} ubicado en ${certificado?.municipio || ''}, Jalisco, con Clave de Centro de Trabajo ${certificado?.cct || ''} con clave de RVOE ${certificado?.rvoe || ''}, CERTIFICA que`;
  drawText({
    text: textoIntro,
    y: 140,
    size: 7,
    align: 'center',
    width: 500,
  });

  let yAlumno = 170;
  drawText({
    text: certificado?.nombreAlumno?.toUpperCase() || '',
    x: width / 2,
    y: yAlumno,
    size: 9.5,
    bold: true,
    align: 'center',
  });

  yAlumno += 15;
  const textoAlumno = `Con Clave Única de Registro de Población ${certificado?.curp || ''} y número de matrícula ${certificado?.matricula || ''} acreditó totalmente las ${certificado?.totalAsignaturas || ''} asignaturas que comprende el plan de estudios vigente del bachillerato intensivo semiescolarizado, en el periodo del 12 de octubre del 2020 al 15 de julio del 2022.`;
  drawText({
    text: textoAlumno,
    y: yAlumno,
    size: 7,
    align: 'center',
    width: 500,
  });

  const tablaX = 57;
  const tablaAncho = 500;
  const mitad = tablaX + tablaAncho / 2;
  const altoFila = 10;
  const y = yAlumno + 25;
  const ciclos = certificado.ciclos || [];
  const mitadCiclos = Math.ceil(ciclos.length / 2);
  const col1 = ciclos.slice(0, mitadCiclos);
  const col2 = ciclos.slice(mitadCiclos);

  const colAsignaturaAncho = (tablaAncho / 2) * 0.85;
  const colCalifAncho = (tablaAncho / 2) * 0.15;

  const lineaCalif1 = tablaX + colAsignaturaAncho;
  const lineaCalif2 = mitad + colAsignaturaAncho;

  doc.setLineWidth(0.8);

  const centroAsig1 = tablaX + (colAsignaturaAncho / 2);
  const centroCalif1 = lineaCalif1 + (colCalifAncho / 2);

  doc.setFont('Nutmeg', 'bold');
  doc.setFontSize(7);

  let headerWidth = doc.getTextWidth('ASIGNATURAS');
  doc.text('ASIGNATURAS', centroAsig1 - (headerWidth / 2), y + 14);

  headerWidth = doc.getTextWidth('CALIF.');
  doc.text('CALIF.', centroCalif1 - (headerWidth / 2), y + 9);
  headerWidth = doc.getTextWidth('FINAL');
  doc.text('FINAL', centroCalif1 - (headerWidth / 2), y + 17);

  const centroAsig2 = mitad + (colAsignaturaAncho / 2);
  const centroCalif2 = lineaCalif2 + (colCalifAncho / 2);

  headerWidth = doc.getTextWidth('ASIGNATURAS');
  doc.text('ASIGNATURAS', centroAsig2 - (headerWidth / 2), y + 14);

  headerWidth = doc.getTextWidth('CALIF.');
  doc.text('CALIF.', centroCalif2 - (headerWidth / 2), y + 9);
  headerWidth = doc.getTextWidth('FINAL');
  doc.text('FINAL', centroCalif2 - (headerWidth / 2), y + 17);

  doc.line(tablaX, y + 22, tablaX + tablaAncho, y + 22);

  const renderCiclos = (col, startX, lineaDivisoria, anchoCalif, yStart) => {
    let yPos = yStart;
    col.forEach((ciclo) => {
      yPos = checkNewPage(yPos);

      drawText({
        text: ciclo.cicloNombre.toUpperCase(),
        x: startX + 5,
        y: yPos,
        bold: true,
        size: 7,
      });
      yPos += 9;

      (ciclo.asignaturas || []).forEach((m) => {
        drawText({
          text: m.nombre || '',
          x: startX + 5,
          y: yPos,
          size: 7,
        });

        const califX = lineaDivisoria + (anchoCalif / 2);
        const califText = m.calificacion?.toString() || '';
        doc.setFont('Nutmeg', 'normal');
        doc.setFontSize(7);
        const califWidth = doc.getTextWidth(califText);
        doc.text(califText, califX - (califWidth / 2), yPos);

        yPos += altoFila;
      });

      yPos += 2;
    });
    return yPos;
  };

  const yMateria = y + 30;
  const yFinCol1 = renderCiclos(col1, tablaX, lineaCalif1, colCalifAncho, yMateria);
  const yFinCol2 = renderCiclos(col2, mitad, lineaCalif2, colCalifAncho, yMateria);
  const finTablaY = Math.max(yFinCol1, yFinCol2) + 5;

  doc.roundedRect(tablaX, y, tablaAncho, finTablaY - y, 5, 5, 'S');

  doc.line(mitad, y, mitad, finTablaY);

  doc.line(lineaCalif1, y, lineaCalif1, finTablaY);
  doc.line(lineaCalif2, y, lineaCalif2, finTablaY);

  const yPostTabla = finTablaY + 10;
  const col1X = tablaX;

  let promedio = certificado?.promedioGeneral;
  if (typeof promedio === 'string') {
    const num = parseFloat(promedio);
    promedio = Number.isFinite(num) ? num.toFixed(1) : 'N/A';
  } else if (typeof promedio === 'number' && Number.isFinite(promedio)) {
    promedio = promedio.toFixed(1);
  } else {
    promedio = 'N/A';
  }

  const textY = yPostTabla + 5;

  drawText({
    text: 'PROMEDIO GENERAL',
    x: col1X,
    y: textY,
    size: 6,
    bold: true,
    align: 'left',
  });

  drawText({
    text: 'DE APROVECHAMIENTO',
    x: col1X,
    y: textY + 8,
    size: 6,
    bold: true,
    align: 'left',
  });

  const rectY = textY + 20;
  const rectWidth = 70;
  const rectHeight = 20;
  const rectX = col1X;

  doc.setLineWidth(0.8);
  doc.rect(rectX, rectY, rectWidth, rectHeight);

  const calificacionX = rectX + (rectWidth / 2);
  const calificacionY = rectY + (rectHeight / 2) + 4;

  doc.setFont('Nutmeg', 'bold');
  doc.setFontSize(11);
  const textWidth = doc.getTextWidth(promedio);
  doc.text(promedio, calificacionX - (textWidth / 2), calificacionY);

  const qrSize = 80;
  const qrY = rectY + rectHeight + 10;
  const qrX = rectX + (rectWidth / 2) - (qrSize / 2);

  const qrUrl = `${process.env.BASE_URL_FRONT || 'https://siiges.jalisco.gob.mx'}/certificado/${certificado?.folioControl || 'folio'}/consultarFolio`;
  const qrDataUrl = await generarQR(qrUrl);
  doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);

  doc.setFontSize(7);
  let yTexto = yPostTabla;
  const salto = 9;
  const col2X = rectX + rectWidth + 15;
  const col2Ancho = width - col2X - 40;

  const legalLines = [
    { bold: true, text: 'Autoridad educativa: ' },
    { bold: false, text: 'JUAN CARLOS FLORES MIRAMONTES, SECRETARIO DE EDUCACIÓN.' },
    { bold: true, text: 'No. certificado autoridad educativa: ' },
    { bold: false, text: '00000000000000002473' },
    { bold: true, text: 'Sello digital autoridad educativa:' },
    { bold: false, text: '20103314|59719347|NTk3MTkzNDd8UG9saXRpY2EgRXN0YW1wYSBUaWVtcG89MS4zLjYuMS40LjEuOTIwMy4yLjEsIERpZ2VzdGlvbiBFc3RhbXBhIFRpZW1wbz01MzAxRkI0MUM4ODRGN0MzRjE4MDZFQUVFQUI3M0U3RTE0MDRENTM3Q0I5MzEwNTYwMjk0MkVEMTZBRUY2RjZELCBOdW1lcm8gU2VjdWVuY2lhIEVzdGFtcGEgVGllbXBvPTQyNzU1NzMyLCBGZWNoYSBFbWlzaW9uIEVzdGFtcGEgVGllbXBvPTIwMjUxMTE5MDQzMTI3Wg==| 20D' },
    { bold: true, text: 'Fecha y hora de timbrado: ' },
    { bold: false, text: '19/07/2022 1:35pm' },
    { bold: false, text: 'Con fundamento en lo dispuesto por el artículo 60 de la Ley General de Educación, los certificados de estudios expedidos por instituciones del Sistema Educativo Nacional, tienen validez en la República Mexicana sin necesidad de trámites adicionales de autenticación o legalización favoreciendo el tránsito del estudiante por el Sistema Educativo Nacional.' },
    { bold: false, text: 'El presente certificado de estudios ha sido firmado mediante el uso de la firma electrónica avanzada, amparada por un certificado vigente a la fecha de su emisión y es válido de conformidad con lo dispuesto en los artículos 4, 7, 9, 11, 13, 14, 15 y 29 de la Ley de Firma Electrónica Avanzada para el Estado de Jalisco y sus Municipios, y demás aplicables del Reglamento de la Ley de Firma Electrónica Avanzada para el Estado de Jalisco y sus Municipios' },
    { bold: false, text: 'La versión electrónica del presente documento, su integridad y autoría se podrá comprobar a través de la página electrónica de la Dirección de Acreditación, Incorporación y Revalidación Educativa de la Secretaría de Educación del Estado de Jalisco, por medio de la siguiente liga: http://consultaescolar.jalisco.gob.mx/escolar . De igual manera, podrá verificar el documento electrónico por medio del código QR.' },
  ];

  legalLines.forEach((line) => {
    doc.setFont('Nutmeg', line.bold ? 'bold' : 'normal');
    const wrapped = doc.splitTextToSize(line.text, col2Ancho);
    doc.text(wrapped, col2X, yTexto);
    yTexto += wrapped.length * salto;
  });

  const yFolio = Math.max(qrY + 70, yTexto + 5);

  doc.setFont('Nutmeg', 'bold');
  doc.setFontSize(8);
  doc.text(`Folio ${certificado?.folioControl || 'CTE1422068255'}`, tablaX, yFolio);

  doc.setFont('Nutmeg', 'normal');
  doc.setFontSize(7);
  const textoExp = 'El presente documento se expide en Guadalajara, Jalisco a los veinte días del mes de julio del dos mil veintidós.';
  const textoExpSplit = doc.splitTextToSize(textoExp, width - 120);
  doc.text(textoExpSplit, tablaX, yFolio + 12);

  return doc.output('arraybuffer');
}

module.exports = { GenerarCertificado };
