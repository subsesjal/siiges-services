const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
const QRCode = require('qrcode');
const { addGaretFonts } = require('../garet-fonts');

const img7 = fs.readFileSync(path.join(__dirname, '/images/img7.png'), { encoding: 'base64' });

function numeroALetras(num) {
  const letras = {
    0: 'CERO',
    1: 'UNO',
    2: 'DOS',
    3: 'TRES',
    4: 'CUATRO',
    5: 'CINCO',
    6: 'SEIS',
    7: 'SIETE',
    8: 'OCHO',
    9: 'NUEVE',
    10: 'DIEZ',
    50: 'CINCUENTA',
    60: 'SESENTA',
    70: 'SETENTA',
    80: 'OCHENTA',
    90: 'NOVENTA',
    100: 'CIEN',
  };

  const numStr = String(num);
  const partes = numStr.split('.');

  const entero = parseInt(partes[0], 10);
  const decimal = partes[1] ? partes[1] : null;

  let resultado = '';

  if (letras[entero] !== undefined) {
    resultado = letras[entero];
  } else if (entero > 50 && entero < 100) {
    const decena = Math.floor(entero / 10) * 10;
    const unidad = entero % 10;
    resultado = `${letras[decena]} Y ${letras[unidad]}`;
  }

  if (decimal && parseInt(decimal, 10) !== 0) {
    resultado = `${resultado} PUNTO`;

    decimal.split('').forEach((digitoStr) => {
      const digito = parseInt(digitoStr, 10);
      resultado = `${resultado} ${letras[digito]}`;
    });
  }

  return resultado;
}

async function agregarQR(doc, url, xPos, yPos, size = 80) {
  const qrDataUrl = await QRCode.toDataURL(url, {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 1,
    margin: 1,
    width: 128,
  });

  doc.addImage(qrDataUrl, 'PNG', xPos, yPos, size, size);
}

async function agregarFooter(doc, certificado) {
  const height = doc.internal.pageSize.getHeight();
  const blockX = 57;
  const blockWidth = 500;

  const footerY = height - 180;

  const grayColor = [120, 120, 120];
  const blackColor = [0, 0, 0];

  doc.setFont('Garet', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...blackColor);

  const tipoCertificadoTexto = certificado?.tipoCertificado?.toUpperCase();
  const totalAsignaturas = certificado?.grados
    ?.reduce((total, grado) => total + (grado.asignaturas?.length || 0), 0) || 0;
  const promedioTexto = certificado?.promedioGeneral || 'N/A';
  const calificacionMinima = certificado?.calificacionMinima;
  const calificacionMaxima = certificado?.calificacionMaxima;
  const calificacionAprobatoria = certificado?.calificacionAprobatoria;

  const resumenTexto = `El presente certificado ${tipoCertificadoTexto} ampara ${totalAsignaturas} asignaturas de un total de ${totalAsignaturas} obteniendo un promedio de ${promedioTexto}. La escala de calificaciones es de ${calificacionMinima} a ${calificacionMaxima} y la mínima aprobatoria es de ${calificacionAprobatoria}.`;

  const resumenLines = doc.splitTextToSize(resumenTexto, blockWidth);
  doc.text(resumenLines, blockX, footerY);

  let currentY = footerY + (resumenLines.length * 7) + 3;

  const creditosPrograma = certificado?.creditosPrograma;
  const creditosTexto = `Las presentes asignaturas conforman un total de ${creditosPrograma} créditos de un mínimo de ${creditosPrograma} créditos requeridos.`;

  const creditosLines = doc.splitTextToSize(creditosTexto, blockWidth);
  doc.text(creditosLines, blockX, currentY);

  currentY += (creditosLines.length * 7) + 10;

  const datosVerificacion = {
    identificadorDocumento: certificado?.identificadorUnico,
    noSecuencia: certificado?.secuenciaDocumento,
    fechaFirmado: certificado?.fechaFirmado,
    selloDigital: certificado?.firmaDigital,
    sitioVerificacion: certificado?.sitioVerificacion,
    nombreFirmante: certificado?.nombreFirmante,
    cargoFirmante: certificado?.cargoFirmante,
    firmaElectronica: certificado?.firmaElectronica,
  };

  const leftColumnX = blockX - 20;
  const leftColumnWidth = 330;
  const qrX = leftColumnWidth + 30;
  const qrSize = 80;
  const fundamentoX = qrX + qrSize + 9;
  const fundamentoWidth = blockWidth - (fundamentoX - blockX) + 15;

  let y = currentY;

  doc.setFont('Garet', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...blackColor);
  doc.text('Datos de verificación', leftColumnX, y);
  y += 10;

  doc.setFont('Garet', 'normal');
  doc.setFontSize(5);
  doc.setTextColor(...grayColor);
  doc.text(`Identificador de documento: ${datosVerificacion.identificadorDocumento}`, leftColumnX, y);
  y += 8;

  doc.text(`No. de secuencia: ${datosVerificacion.noSecuencia}`, leftColumnX, y);
  y += 8;

  doc.text(`Fecha de firmado: ${datosVerificacion.fechaFirmado}`, leftColumnX, y);
  y += 11;

  doc.text('Sello digital:', leftColumnX, y);
  y += 5;
  doc.setFontSize(4);
  const selloLines = doc.splitTextToSize(datosVerificacion.selloDigital, leftColumnWidth);
  doc.text(selloLines, leftColumnX, y);
  y += selloLines.length * 4 + 4;

  doc.setFontSize(5);
  const sitioLines = doc.splitTextToSize(`Sitio de verificación: ${datosVerificacion.sitioVerificacion}`, leftColumnWidth);
  doc.text(sitioLines, leftColumnX, y);
  y += sitioLines.length * 5 + 8;

  doc.setFont('Garet', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...blackColor);
  doc.text('Autorizó / Firma electrónica', leftColumnX, y);
  y += 10;

  doc.setFont('Garet', 'normal');
  doc.setFontSize(5);
  doc.setTextColor(...grayColor);
  doc.text(datosVerificacion.nombreFirmante, leftColumnX, y);
  y += 8;

  doc.text(datosVerificacion.cargoFirmante, leftColumnX, y);
  y += 11;

  doc.text('Firma electrónica:', leftColumnX, y);
  y += 5;
  doc.setFontSize(3.5);
  const firmaLines = doc.splitTextToSize(datosVerificacion.firmaElectronica, leftColumnWidth);
  doc.text(firmaLines, leftColumnX, y);

  await agregarQR(doc, datosVerificacion.sitioVerificacion, qrX, currentY + 10, qrSize);

  doc.setFont('Garet', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(...blackColor);
  doc.text('Fundamento Legal', fundamentoX, currentY);

  doc.setFont('Garet', 'normal');
  doc.setFontSize(4.5);
  doc.setTextColor(...grayColor);

  const fundamentoTexto = 'El presente documento ha sido firmado mediante el uso de la firma electrónica avanzada de la servidora pública o del servidor público competente, amparada por un certificado digital vigente a la fecha de su elaboración y es válido de conformidad con lo dispuesto en los artículos 1, 2 fracción I, 7, 9 y 11 de la Ley de Firma Electrónica Avanzada para el Estado de Jalisco y sus Municipios y demás aplicables del Reglamento de la Ley de Firma Electrónica Avanzada para el Estado de Jalisco y sus Municipios; asimismo, con fundamento en los artículos 14 de la Ley General de Educación Superior y 16 de la Ley de Educación Superior del Estado de Jalisco, el documento ha sido autenticado por autoridad competente y tiene validez oficial en todo el territorio nacional. Su integridad y autoría podrá verificarse mediante el código QR.';

  const fundamentoLines = doc.splitTextToSize(fundamentoTexto, fundamentoWidth);

  let yFundamento = currentY + 10;
  const lineHeight = 5;

  fundamentoLines.forEach((line, index) => {
    const isLastLine = index === fundamentoLines.length - 1;

    if (isLastLine) {
      doc.text(line, fundamentoX, yFundamento);
    } else {
      const words = line.trim().split(/\s+/);

      if (words.length > 1) {
        const wordsWidth = words.reduce((total, word) => total + doc.getTextWidth(word), 0);
        const totalSpaceWidth = fundamentoWidth - wordsWidth;
        const spaceCount = words.length - 1;
        const spaceWidth = spaceCount > 0 ? totalSpaceWidth / spaceCount : 0;

        let xPos = fundamentoX;
        words.forEach((word, i) => {
          doc.text(word, xPos, yFundamento);
          xPos += doc.getTextWidth(word);

          if (i < words.length - 1) {
            xPos += spaceWidth;
          }
        });
      } else {
        doc.text(line, fundamentoX, yFundamento);
      }
    }

    yFundamento += lineHeight;
  });
}

async function GenerarCertificado(certificado) {
  const JsPDF = jsPDF;
  const doc = new JsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
  addGaretFonts(doc);

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  doc.addImage(img7, 'PNG', 0, 0, width, height);
  doc.setTextColor(0, 0, 0);
  doc.setFont('Garet', 'normal');

  const centerTextInBox = (
    text,
    x,
    boxWidth,
    y,
    size = 8,
    bold = false,
    alignBottom = false,
    refHeight = 0,
  ) => {
    if (!text) return { height: 0, lastY: y };

    doc.setFont('Garet', bold ? 'bold' : 'normal');
    doc.setFontSize(size);

    const lines = doc.splitTextToSize(text, boxWidth);
    const lineHeight = size * 1.2;
    const totalHeight = lines.length * lineHeight;

    let startY = y;
    if (alignBottom && refHeight > totalHeight) {
      startY = y + (refHeight - totalHeight);
    }

    let lastY = startY;
    lines.forEach((line, i) => {
      const textWidth = doc.getTextWidth(line);
      const xCentered = x + (boxWidth - textWidth) / 2;
      lastY = startY + i * lineHeight;
      doc.text(line, xCentered, lastY);
    });

    return { height: totalHeight, lastY };
  };

  const drawCenteredBlockTitle = (text, xStart, boxWidth, y, fontSize = 8) => {
    const textWidth = doc.getTextWidth(text);
    const xCentered = xStart + (boxWidth - textWidth) / 2;
    doc.setFont('Garet', 'bold');
    doc.setFontSize(fontSize);
    doc.text(text, xCentered, y);
  };

  const drawLine = (y) => {
    doc.line(57, y, 557, y);
  };

  doc.setFontSize(9);
  const centerX = width / 2;
  doc.text('SECRETARÍA DE INNOVACIÓN, CIENCIA Y TECNOLOGÍA DE JALISCO', centerX, 70, { align: 'center' });
  doc.text('SUBSECRETARÍA DE EDUCACIÓN SUPERIOR', centerX, 82, { align: 'center' });
  doc.setFont('Garet', 'bold');
  doc.text('CERTIFICADO DE ESTUDIOS', centerX, 94, { align: 'center' });

  doc.setFontSize(8.5);
  doc.setFont('Garet', 'normal');
  doc.text(
    'Con base en el 16 de la Ley de Educación Superior del Estado de Jalisco, se expide el presente CERTIFICADO a:',
    57,
    130,
  );

  const baseY = 135;
  const blockX = 57;
  const blockWidth = 500;
  doc.setFillColor(252, 133, 32);
  doc.rect(blockX, baseY, blockWidth, 14, 'F');
  drawCenteredBlockTitle('Datos del titulado', blockX, blockWidth, baseY + 10);

  const datosY = baseY + 26;
  const colWidths = [160, 160, 160];
  const colX = [blockX, blockX + colWidths[0], blockX + colWidths[0] + colWidths[1]];

  centerTextInBox(certificado?.nombreAlumno || '', colX[0], colWidths[0], datosY, 8, false);
  centerTextInBox(certificado?.paternoAlumno || '', colX[1], colWidths[1], datosY, 8, false);
  centerTextInBox(certificado?.maternoAlumno || '', colX[2], colWidths[2], datosY, 8, false);

  drawLine(datosY + 4);

  centerTextInBox('Nombre(s)', colX[0], colWidths[0], datosY + 15, 8);
  centerTextInBox('Primer apellido', colX[1], colWidths[1], datosY + 15, 8);
  centerTextInBox('Segundo apellido', colX[2], colWidths[2], datosY + 15, 8);

  const curpY = datosY + 30;
  const colY2 = curpY;
  const colWidths2 = [250, 250];
  const colX2 = [blockX, blockX + colWidths2[0]];

  const programaBox = centerTextInBox(
    certificado?.carrera || '',
    colX2[1],
    colWidths2[1],
    colY2,
    8,
    false,
  );

  const curpBox = centerTextInBox(
    certificado?.curp || '',
    colX2[0],
    colWidths2[0],
    colY2,
    8,
    false,
    true,
    programaBox.height,
  );

  const maxY = Math.max(curpBox.lastY, programaBox.lastY);
  drawLine(maxY + 4);

  centerTextInBox('CURP', colX2[0], colWidths2[0], maxY + 15, 8);
  centerTextInBox('Nombre del programa', colX2[1], colWidths2[1], maxY + 15, 8);

  const dobleColumnaY = maxY + 25;

  const colIzqX = blockX;
  const colIzqWidth = 200;

  doc.setFillColor(252, 133, 32);
  doc.rect(colIzqX, dobleColumnaY, colIzqWidth, 16, 'F');
  drawCenteredBlockTitle('Datos de la institución educativa', colIzqX, colIzqWidth, dobleColumnaY + 10);

  const institDatoY = dobleColumnaY + 26;
  centerTextInBox(certificado?.nombrePlantel || '', colIzqX, colIzqWidth, institDatoY, 8, false);
  doc.line(colIzqX, institDatoY + 4, colIzqX + colIzqWidth, institDatoY + 4);
  centerTextInBox('Nombre o denominación', colIzqX, colIzqWidth, institDatoY + 15, 8);

  let institExtraY = institDatoY + 25;
  doc.setFont('Garet', 'normal');
  doc.setFontSize(7);

  doc.text('CCT:', colIzqX, institExtraY);
  doc.text(certificado?.cct || 'N/A', colIzqX + colIzqWidth, institExtraY, { align: 'right' });
  institExtraY += 12;

  doc.text('RVOE:', colIzqX, institExtraY);
  doc.text(certificado?.rvoe || 'N/A', colIzqX + colIzqWidth, institExtraY, { align: 'right' });
  institExtraY += 12;

  doc.text('FECHA DEL RVOE:', colIzqX, institExtraY);
  doc.text(certificado?.fechaRvoe || 'N/A', colIzqX + colIzqWidth, institExtraY, { align: 'right' });
  institExtraY += 12;

  doc.text('CLAVE DE INSTITUCIÓN:', colIzqX, institExtraY);
  doc.text('14337', colIzqX + colIzqWidth, institExtraY, { align: 'right' });
  institExtraY += 12;

  doc.text('CLAVE DE CARRERA:', colIzqX, institExtraY);
  doc.text('21010', colIzqX + colIzqWidth, institExtraY, { align: 'right' });

  const colDerX = colIzqX + colIzqWidth + 20;
  const colDerWidth = 280;

  doc.setFillColor(252, 133, 32);
  doc.rect(colDerX, dobleColumnaY, colDerWidth, 16, 'F');
  drawCenteredBlockTitle('Datos de expedición', colDerX, colDerWidth, dobleColumnaY + 10);

  const expDatoY = dobleColumnaY + 26;

  const colFolioWidth = 140;
  const colFechaWidth = 140;
  const colFolioX = colDerX;
  const colFechaX = colDerX + colFolioWidth;

  centerTextInBox(certificado?.folioControl || '', colFolioX, colFolioWidth, expDatoY, 8, false);
  doc.line(colFolioX, expDatoY + 4, colFolioX + colFolioWidth, expDatoY + 4);
  centerTextInBox('Folio', colFolioX, colFolioWidth, expDatoY + 15, 8);

  centerTextInBox(certificado?.fechaExpedicion || '', colFechaX, colFechaWidth, expDatoY, 8, false);
  doc.line(colFechaX, expDatoY + 4, colFechaX + colFechaWidth, expDatoY + 4);
  centerTextInBox('Fecha de expedición', colFechaX, colFechaWidth, expDatoY + 15, 8);

  let expExtraY = expDatoY + 35;

  const colExpIzqX = colDerX;
  const colExpIzqWidth = 140;

  doc.setFont('Garet', 'normal');
  doc.setFontSize(7);

  doc.text('Libro', colExpIzqX, expExtraY);
  doc.text(certificado?.libro || 'N/A', colExpIzqX + colExpIzqWidth, expExtraY, { align: 'right' });
  expExtraY += 12;

  doc.text('Foja', colExpIzqX, expExtraY);
  doc.text(certificado?.foja || 'N/A', colExpIzqX + colExpIzqWidth, expExtraY, { align: 'right' });
  expExtraY += 12;

  doc.text('Fecha de inicio', colExpIzqX, expExtraY);
  doc.text(certificado?.fechaInicio || 'N/A', colExpIzqX + colExpIzqWidth, expExtraY, { align: 'right' });
  expExtraY += 12;

  doc.text('Fecha de terminación', colExpIzqX, expExtraY);
  doc.text(certificado?.fechaTerminacion || 'N/A', colExpIzqX + colExpIzqWidth, expExtraY, { align: 'right' });

  const colExpDerX = colDerX + colExpIzqWidth;
  const colExpDerWidth = 140;

  const expDerY = expDatoY + 32;
  const offsetDerecha = 10;
  centerTextInBox('Jalisco', colExpDerX + offsetDerecha, colExpDerWidth - offsetDerecha, expDerY, 8, false);
  centerTextInBox('Entidad federativa', colExpDerX + offsetDerecha, colExpDerWidth - offsetDerecha, expDerY + 12, 8);

  const promedioTipoY = expDerY + 22;

  const subColWidth = (colExpDerWidth - 2) / 2;
  const subColPromedioX = colExpDerX + offsetDerecha;
  const subColTipoX = colExpDerX + subColWidth + 2 + offsetDerecha;

  doc.setFillColor(252, 133, 32);
  doc.rect(subColPromedioX, promedioTipoY, subColWidth - 10, 16, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFont('Garet', 'bold');
  doc.setFontSize(5);
  const promedioText = 'Promedio General del Certificado';
  const promedioLines = doc.splitTextToSize(promedioText, subColWidth - 14);
  let promedioTextY = promedioTipoY + 6;
  promedioLines.forEach((line) => {
    const lineWidth = doc.getTextWidth(line);
    doc.text(line, subColPromedioX + ((subColWidth - 10) - lineWidth) / 2, promedioTextY);
    promedioTextY += 5;
  });

  const promedioValorY = promedioTipoY + 23;
  doc.setFont('Garet', 'normal');
  doc.setFontSize(6);
  const promedioValor = `PROMEDIO: ${certificado?.promedioGeneral || 'N/A'}`;
  const promedioValorWidth = doc.getTextWidth(promedioValor);
  doc.text(promedioValor, subColPromedioX
    + ((subColWidth - 10) - promedioValorWidth) / 2, promedioValorY);

  doc.setFillColor(252, 133, 32);
  doc.rect(subColTipoX, promedioTipoY, subColWidth - 10, 16, 'F');
  doc.setFont('Garet', 'bold');
  doc.setFontSize(6);
  const tipoText = 'Tipo de Certificado';
  const tipoLines = doc.splitTextToSize(tipoText, subColWidth - 14);
  let tipoTextY = promedioTipoY + 6;
  tipoLines.forEach((line) => {
    const lineWidth = doc.getTextWidth(line);
    doc.text(line, subColTipoX + ((subColWidth - 10) - lineWidth) / 2, tipoTextY);
    tipoTextY += 5;
  });

  const tipoValorY = promedioTipoY + 23;
  doc.setFont('Garet', 'normal');
  doc.setFontSize(6);
  const tipoValor = certificado?.tipoCertificado;
  const tipoValorWidth = doc.getTextWidth(tipoValor);
  doc.text(tipoValor, subColTipoX + ((subColWidth - 10) - tipoValorWidth) / 2, tipoValorY);

  const datosCertificadoY = Math.max(institExtraY, promedioValorY) + 5;

  doc.setFillColor(252, 133, 32);
  doc.rect(blockX, datosCertificadoY, blockWidth, 14, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFont('Garet', 'bold');
  doc.setFontSize(8);
  const datosCertText = 'Datos del certificado';
  const datosCertWidth = doc.getTextWidth(datosCertText);
  doc.text(datosCertText, blockX + (blockWidth - datosCertWidth) / 2, datosCertificadoY + 10);

  const textoDescriptivoY = datosCertificadoY + 20;
  doc.setFont('Garet', 'normal');
  doc.setFontSize(6);
  const textoDescriptivo = `Cursó y aprobó las asignaturas que se consignan en el plan de estudios de la ${certificado?.carrera?.toUpperCase() || ''}.`;
  const textoDescriptivoLines = doc.splitTextToSize(textoDescriptivo, blockWidth);
  doc.text(textoDescriptivoLines, blockX, textoDescriptivoY);

  const tablaY = textoDescriptivoY + 15;
  const tablaX = blockX;
  const columnaAncho = blockWidth / 2;

  const colAsignaturaAncho = columnaAncho * 0.48;
  const colPeriodoAncho = columnaAncho * 0.15;
  const colTipoAncho = columnaAncho * 0.08;
  const colNumAncho = columnaAncho * 0.08;

  const xAsignaturaIzq = tablaX;
  const xPeriodoIzq = tablaX + colAsignaturaAncho;
  const xTipoIzq = xPeriodoIzq + colPeriodoAncho;
  const xNumIzq = xTipoIzq + colTipoAncho;
  const xLetraIzq = xNumIzq + colNumAncho;

  const xAsignaturaDer = tablaX + columnaAncho;
  const xPeriodoDer = xAsignaturaDer + colAsignaturaAncho;
  const xTipoDer = xPeriodoDer + colPeriodoAncho;
  const xNumDer = xTipoDer + colTipoAncho;
  const xLetraDer = xNumDer + colNumAncho;

  const dibujarHeaders = (mostrarColumnaDerecha = true) => {
    doc.setFont('Garet', 'bold');
    doc.setFontSize(5);

    doc.text('ASIGNATURAS', xAsignaturaIzq + 2, tablaY);
    doc.text('PERIODO', xPeriodoIzq + (colPeriodoAncho / 2) - (doc.getTextWidth('PERIODO') / 2), tablaY);
    doc.text('TIPO', xTipoIzq + (colTipoAncho / 2) - (doc.getTextWidth('TIPO') / 2), tablaY);
    doc.text('NÚM', xNumIzq + (colNumAncho / 2) - (doc.getTextWidth('NÚM') / 2), tablaY);
    doc.setFontSize(4);
    doc.text('CALIFICACIÓN\nLETRA', xLetraIzq + 2, tablaY - 1);

    if (mostrarColumnaDerecha) {
      doc.setFontSize(5);
      doc.text('ASIGNATURAS', xAsignaturaDer + 2, tablaY);
      doc.text('PERIODO', xPeriodoDer + (colPeriodoAncho / 2) - (doc.getTextWidth('PERIODO') / 2), tablaY);
      doc.text('TIPO', xTipoDer + (colTipoAncho / 2) - (doc.getTextWidth('TIPO') / 2), tablaY);
      doc.text('NÚM', xNumDer + (colNumAncho / 2) - (doc.getTextWidth('NÚM') / 2), tablaY);
      doc.setFontSize(4);
      doc.text('CALIFICACIÓN\nLETRA', xLetraDer + 2, tablaY - 1);
    }
  };

  const grados = certificado?.grados || [];
  const margenInferior = 220;
  const altoFila = 5.5;

  const hayColumnaDerecha = grados.length > 1;
  dibujarHeaders(hayColumnaDerecha);

  const calcularAlturaGrado = (grado) => {
    const asignaturas = grado.asignaturas || [];
    return altoFila + (asignaturas.length * altoFila) + 2;
  };

  const dibujarGrado = (grado, xAsignatura, xPeriodo, xTipo, xNum, xLetra, yInicial) => {
    let yPos = yInicial;

    doc.setFont('Garet', 'bold');
    doc.setFontSize(5);
    const gradoNombre = (grado.gradoNombre || '').toUpperCase();
    doc.text(gradoNombre, xAsignatura + 2, yPos);
    yPos += altoFila;

    const asignaturas = grado.asignaturas || [];
    asignaturas.forEach((asig) => {
      doc.setFont('Garet', 'normal');
      doc.setFontSize(4.5);

      const nombreAsig = (asig.nombre || '').toUpperCase();
      const nombreAsigLines = doc.splitTextToSize(nombreAsig, colAsignaturaAncho - 4);

      nombreAsigLines.forEach((line, idx) => {
        doc.text(line, xAsignatura + 8, yPos + (idx * altoFila));
      });

      const periodo = String(asig.periodo || '');
      const periodoWidth = doc.getTextWidth(periodo);
      doc.text(periodo, xPeriodo + (colPeriodoAncho / 2) - (periodoWidth / 2), yPos);

      let tipoTexto = 'ORD';
      if (asig.tipo === 2 || asig.tipo === '2') {
        tipoTexto = 'EXTRA';
      } else if (asig.tipo === 1 || asig.tipo === '1') {
        tipoTexto = 'ORD';
      } else {
        tipoTexto = String(asig.tipo || 'ORD');
      }
      const tipoWidth = doc.getTextWidth(tipoTexto);
      doc.text(tipoTexto, xTipo + (colTipoAncho / 2) - (tipoWidth / 2), yPos);

      const calNum = String(asig.calificacion || '');
      const calNumWidth = doc.getTextWidth(calNum);
      doc.text(calNum, xNum + (colNumAncho / 2) - (calNumWidth / 2), yPos);

      const calLetra = asig.calificacionLetra || numeroALetras(asig.calificacion) || '';
      doc.text(String(calLetra), xLetra + 2, yPos);

      yPos += altoFila * Math.max(1, nombreAsigLines.length);
    });

    yPos += 2;
    return yPos;
  };

  const addNewPage = async (mostrarColumnaDerecha = true) => {
    await agregarFooter(doc, certificado);
    doc.addPage();
    doc.addImage(img7, 'PNG', 0, 0, width, height);
    doc.setTextColor(0, 0, 0);

    doc.setFont('Garet', 'normal');
    doc.setFontSize(9);
    doc.text('SECRETARÍA DE INNOVACIÓN, CIENCIA Y TECNOLOGÍA DE JALISCO', centerX, 70, { align: 'center' });
    doc.text('SUBSECRETARÍA DE EDUCACIÓN SUPERIOR', centerX, 82, { align: 'center' });
    doc.setFont('Garet', 'bold');
    doc.text('CERTIFICADO DE ESTUDIOS', centerX, 94, { align: 'center' });
    doc.setFont('Garet', 'normal');

    const nuevoDatosCertificadoY = 125;

    doc.setFillColor(252, 133, 32);
    doc.rect(blockX, nuevoDatosCertificadoY, blockWidth, 14, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFont('Garet', 'bold');
    doc.setFontSize(8);
    doc.text(datosCertText, blockX
      + (blockWidth - datosCertWidth) / 2, nuevoDatosCertificadoY + 10);

    const nuevoTextoDescriptivoY = nuevoDatosCertificadoY + 20;
    doc.setFont('Garet', 'normal');
    doc.setFontSize(6);
    doc.text(textoDescriptivoLines, blockX, nuevoTextoDescriptivoY);

    const nuevoTablaY = nuevoTextoDescriptivoY + 15;

    doc.setFont('Garet', 'bold');
    doc.setFontSize(5);

    doc.text('ASIGNATURAS', xAsignaturaIzq + 2, nuevoTablaY);
    doc.text('PERIODO', xPeriodoIzq + (colPeriodoAncho / 2) - (doc.getTextWidth('PERIODO') / 2), nuevoTablaY);
    doc.text('TIPO', xTipoIzq + (colTipoAncho / 2) - (doc.getTextWidth('TIPO') / 2), nuevoTablaY);
    doc.text('NÚM', xNumIzq + (colNumAncho / 2) - (doc.getTextWidth('NÚM') / 2), nuevoTablaY);
    doc.setFontSize(4);
    doc.text('CALIFICACIÓN\nLETRA', xLetraIzq + 2, nuevoTablaY - 1);

    if (mostrarColumnaDerecha) {
      doc.setFontSize(5);
      doc.text('ASIGNATURAS', xAsignaturaDer + 2, nuevoTablaY);
      doc.text('PERIODO', xPeriodoDer + (colPeriodoAncho / 2) - (doc.getTextWidth('PERIODO') / 2), nuevoTablaY);
      doc.text('TIPO', xTipoDer + (colTipoAncho / 2) - (doc.getTextWidth('TIPO') / 2), nuevoTablaY);
      doc.text('NÚM', xNumDer + (colNumAncho / 2) - (doc.getTextWidth('NÚM') / 2), nuevoTablaY);
      doc.setFontSize(4);
      doc.text('CALIFICACIÓN\nLETRA', xLetraDer + 2, nuevoTablaY - 1);
    }

    return nuevoTablaY + 8;
  };

  let yPosIzq = tablaY + 8;
  let yPosDer = tablaY + 8;
  let indiceCorte = -1;

  grados.some((grado, i) => {
    const alturaGrado = calcularAlturaGrado(grado);
    const yFinal = yPosIzq + alturaGrado;

    if (yFinal > (height - margenInferior)) {
      indiceCorte = i;
      return true;
    }

    yPosIzq = dibujarGrado(
      grado,
      xAsignaturaIzq,
      xPeriodoIzq,
      xTipoIzq,
      xNumIzq,
      xLetraIzq,
      yPosIzq,
    );
    return false;
  });

  if (indiceCorte !== -1) {
    let faseCompleta = false;

    await grados.slice(indiceCorte).reduce(async (promesaAnterior, grado, idx) => {
      await promesaAnterior;

      if (faseCompleta) return;

      const i = indiceCorte + idx;
      const alturaGrado = calcularAlturaGrado(grado);
      const yFinal = yPosDer + alturaGrado;

      if (yFinal > (height - margenInferior)) {
        const gradosRestantes = grados.length - i;
        const hayMasParaDerecha = gradosRestantes > 1;

        const newY = await addNewPage(hayMasParaDerecha);
        yPosIzq = newY;
        yPosDer = newY;
        indiceCorte = i;
        faseCompleta = true;
        return;
      }

      yPosDer = dibujarGrado(
        grado,
        xAsignaturaDer,
        xPeriodoDer,
        xTipoDer,
        xNumDer,
        xLetraDer,
        yPosDer,
      );
    }, Promise.resolve());

    if (indiceCorte < grados.length) {
      let columnaActual = 'izquierda';

      await grados.slice(indiceCorte).reduce(async (promesaAnterior, grado, idx) => {
        await promesaAnterior;

        const i = indiceCorte + idx;
        const alturaGrado = calcularAlturaGrado(grado);

        if (columnaActual === 'izquierda') {
          const yFinal = yPosIzq + alturaGrado;
          if (yFinal > (height - margenInferior)) {
            const gradosRestantes = grados.length - i;
            const hayMasParaDerecha = gradosRestantes > 1;

            const newY = await addNewPage(hayMasParaDerecha);
            yPosIzq = newY;
            yPosDer = newY;
          }
          yPosIzq = dibujarGrado(
            grado,
            xAsignaturaIzq,
            xPeriodoIzq,
            xTipoIzq,
            xNumIzq,
            xLetraIzq,
            yPosIzq,
          );
          columnaActual = 'derecha';
        } else {
          const yFinal = yPosDer + alturaGrado;
          if (yFinal > (height - margenInferior)) {
            const gradosRestantes = grados.length - i;
            const hayMasParaDerecha = gradosRestantes > 1;

            const newY = await addNewPage(hayMasParaDerecha);
            yPosIzq = newY;
            yPosDer = newY;
          }
          yPosDer = dibujarGrado(
            grado,
            xAsignaturaDer,
            xPeriodoDer,
            xTipoDer,
            xNumDer,
            xLetraDer,
            yPosDer,
          );
          columnaActual = 'izquierda';
        }
      }, Promise.resolve());
    }
  }

  await agregarFooter(doc, certificado);

  return doc.output('arraybuffer');
}

module.exports = { GenerarCertificado };
