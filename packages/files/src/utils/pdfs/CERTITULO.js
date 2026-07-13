const fs = require('fs');
const path = require('path');
const { jsPDF } = require('jspdf');
const QRCode = require('qrcode');
const { addGaretFonts } = require('../garet-fonts');

const img7 = fs.readFileSync(path.join(__dirname, '/images/img7.png'), { encoding: 'base64' });

const REGEX_OPTATIVA_NUMERADA = /\bOPTATIVA\s*([0-9]+|[IVXLCDM]+)\b/i;

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

function calificacionALetras(calificacion, esDecimal) {
  const letra = numeroALetras(calificacion);
  if (!letra) return '';

  if (esDecimal) {
    const num = Number(calificacion);
    if (num !== 10 && Number.isInteger(num)) {
      return `${letra} PUNTO CERO`;
    }
  }

  return letra;
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

  const footerY = height - 190;

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

  currentY += (creditosLines.length * 7) + 20;

  const datosVerificacion = {
    identificadorDocumento: certificado?.identificadorDocumento,
    sitioVerificacion: certificado?.sitioVerificacion,
    noSecuenciaIes: certificado?.secuenciaDocumentoIes,
    fechaFirmadoIes: certificado?.fechaFirmadoIes,
    firmaElectronicaIes: certificado?.firmaElectronicaIes,
    noSecuenciaSicyt: certificado?.secuenciaDocumentoSicyt,
    fechaFirmadoSicyt: certificado?.fechaFirmadoSicyt,
    firmaElectronicaSicyt: certificado?.firmaElectronicaSicyt,
    nombreFirmanteSicyt: certificado?.nombreFirmanteSicyt,
    cargoFirmanteSicyt: certificado?.cargoFirmanteSicyt,
    nombreFirmanteIes: certificado?.nombreFirmanteIes,
  };

  const leftColumnX = blockX - 20;
  const leftColumnWidth = 330;
  const qrX = leftColumnWidth + 30;
  const qrSize = 80;
  const fundamentoX = qrX + qrSize + 9;
  const fundamentoWidth = blockWidth - (fundamentoX - blockX) + 15;

  const firmaTextWidth = qrX - leftColumnX - 12;

  const offsetColumnaIzquierda = 10;

  let y = currentY - offsetColumnaIzquierda;

  doc.setFont('Garet', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...blackColor);
  doc.text('Datos de verificación', leftColumnX, y);
  y += 8;

  doc.setFont('Garet', 'normal');
  doc.setFontSize(5);
  doc.setTextColor(...grayColor);
  doc.text(`Identificador de documento: ${datosVerificacion.identificadorDocumento}`, leftColumnX, y);
  y += 6;

  doc.setFontSize(5);
  const sitioLines = doc.splitTextToSize(`Sitio de verificación: ${datosVerificacion.sitioVerificacion}`, leftColumnWidth);
  doc.text(sitioLines, leftColumnX, y);
  y += sitioLines.length * 6 + 4;

  doc.setFont('Garet', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...blackColor);
  doc.text('Validó / Firma electrónica', leftColumnX, y);
  y += 8;

  doc.setFont('Garet', 'normal');
  doc.setFontSize(5);
  doc.setTextColor(...grayColor);
  doc.text(datosVerificacion.nombreFirmanteIes || 'N/A', leftColumnX, y);
  y += 6;

  doc.text(`No. de secuencia: ${datosVerificacion.noSecuenciaIes}`, leftColumnX, y);
  y += 6;

  doc.text(`Fecha de firmado: ${datosVerificacion.fechaFirmadoIes}`, leftColumnX, y);
  y += 6;

  doc.text('Firma electrónica:', leftColumnX, y);
  y += 5;
  doc.setFontSize(3.5);
  const firmaIesLines = doc.splitTextToSize(datosVerificacion.firmaElectronicaIes, firmaTextWidth);
  doc.text(firmaIesLines, leftColumnX, y);
  y += firmaIesLines.length * 3.5 + 7;

  doc.setFont('Garet', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...blackColor);
  doc.text('Autorizó / Firma electrónica', leftColumnX, y);
  y += 8;

  doc.setFont('Garet', 'normal');
  doc.setFontSize(5);
  doc.setTextColor(...grayColor);
  doc.text(datosVerificacion.nombreFirmanteSicyt || 'N/A', leftColumnX, y);
  y += 6;

  doc.text(datosVerificacion.cargoFirmanteSicyt || 'N/A', leftColumnX, y);
  y += 6;

  doc.text(`No. de secuencia: ${datosVerificacion.noSecuenciaSicyt}`, leftColumnX, y);
  y += 6;

  doc.text(`Fecha de firmado: ${datosVerificacion.fechaFirmadoSicyt}`, leftColumnX, y);
  y += 6;

  doc.text('Firma electrónica:', leftColumnX, y);
  y += 5;
  doc.setFontSize(3.5);
  const firmaSicytLines = doc
    .splitTextToSize(datosVerificacion.firmaElectronicaSicyt, firmaTextWidth);
  doc.text(firmaSicytLines, leftColumnX, y);

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

function ordenarGradosYAsignaturas(grados) {
  return grados.map((grado) => {
    const gradoNombre = (grado.gradoNombre || '').toUpperCase();

    const esFlexible = gradoNombre.includes('FLEXIBLE');
    const esOptativa = gradoNombre.includes('OPTATIVA');

    let asignaturasOrdenadas = [...(grado.asignaturas || [])];

    if (esOptativa || esFlexible) {
      // Mantiene el orden de captura (orden actual)
    } else {
      // Rígida: ordenar por clave de materia
      asignaturasOrdenadas = asignaturasOrdenadas.sort((a, b) => {
        const claveA = String(a.clave || '');
        const claveB = String(b.clave || '');
        return claveA.localeCompare(
          claveB,
          undefined,
          {
            numeric: true,
            sensitivity: 'base',
          },
        );
      });
    }

    return {
      ...grado,
      asignaturas: asignaturasOrdenadas,
    };
  });
}

function identificarOptativas(grados) {
  const asignaturasOptativas = [];

  const gradosProcesados = grados
    .map((grado) => {
      const asignaturasDelGrado = [];

      (grado.asignaturas || []).forEach((asig) => {
        const catalogoTipoEsOptativa = asig.catalogoTipo === 2 || asig.catalogoTipo === '2';
        const catalogoTipoEsOrdinario = asig.catalogoTipo === 1 || asig.catalogoTipo === '1';
        const nombreAsig = (asig.nombre || '').toUpperCase();
        const esOptativaPorNombre = catalogoTipoEsOrdinario
        && REGEX_OPTATIVA_NUMERADA.test(nombreAsig);

        if (catalogoTipoEsOptativa) {
          asignaturasOptativas.push(asig);
        } else if (esOptativaPorNombre) {
          asignaturasDelGrado.push({ ...asig, ocultarDatosPorOptativa: true });
          asignaturasOptativas.push(asig);
        } else {
          asignaturasDelGrado.push(asig);
        }
      });

      return {
        ...grado,
        asignaturas: asignaturasDelGrado,
      };
    })
    .filter((grado) => (grado.asignaturas || []).length > 0);

  if (asignaturasOptativas.length === 0) {
    return gradosProcesados;
  }

  return [
    ...gradosProcesados,
    {
      gradoNombre: 'OPTATIVA',
      asignaturas: asignaturasOptativas,
    },
  ];
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

  doc.setFontSize(8);
  const centerX = width / 2;
  doc.text('SECRETARÍA DE INNOVACIÓN, CIENCIA Y TECNOLOGÍA DEL ESTADO DE JALISCO', centerX, 70, { align: 'center' });
  doc.text('SUBSECRETARÍA DE EDUCACIÓN SUPERIOR', centerX, 82, { align: 'center' });
  doc.setFont('Garet', 'bold');
  doc.text('CERTIFICADO DE ESTUDIOS', centerX, 94, { align: 'center' });

  doc.setFontSize(8);
  doc.setFont('Garet', 'normal');
  doc.text(
    'Con base en el artículo 16 de la Ley de Educación Superior del Estado de Jalisco, se expide el presente CERTIFICADO a:',
    centerX,
    130,
    { align: 'center' },
  );

  const baseY = 135;
  const blockX = 57;
  const blockWidth = 500;
  doc.setFillColor(252, 133, 32);
  doc.rect(blockX, baseY, blockWidth, 14, 'F');
  drawCenteredBlockTitle('Datos del estudiante', blockX, blockWidth, baseY + 10);

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
    `${certificado?.nombreNivel.toUpperCase() || ''}EN ${certificado?.carrera.toUpperCase() || ''}`,
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
  drawCenteredBlockTitle('Datos de la institución educativa', colIzqX, colIzqWidth, dobleColumnaY + 11);

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

  doc.text('Fecha del RVOE:', colIzqX, institExtraY);
  doc.text(certificado?.fechaRvoe || 'N/A', colIzqX + colIzqWidth, institExtraY, { align: 'right' });
  institExtraY += 12;

  doc.text('Clave de Institución:', colIzqX, institExtraY);
  doc.text(certificado?.claveInstitucionDGP || 'N/A', colIzqX + colIzqWidth, institExtraY, { align: 'right' });
  institExtraY += 12;

  doc.text('Clave de carrera:', colIzqX, institExtraY);
  doc.text(certificado?.claveCarreraDGP || 'N/A', colIzqX + colIzqWidth, institExtraY, { align: 'right' });

  const colDerX = colIzqX + colIzqWidth + 20;
  const colDerWidth = 280;

  doc.setFillColor(252, 133, 32);
  doc.rect(colDerX, dobleColumnaY, colDerWidth, 16, 'F');
  drawCenteredBlockTitle('Datos de expedición', colDerX, colDerWidth, dobleColumnaY + 11);

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
  let promedioTextY = promedioTipoY + 7;
  promedioLines.forEach((line) => {
    const lineWidth = doc.getTextWidth(line);
    doc.text(line, subColPromedioX + ((subColWidth - 10) - lineWidth) / 2, promedioTextY);
    promedioTextY += 5;
  });

  const promedioValorY = promedioTipoY + 23;
  doc.setFont('Garet', 'normal');
  doc.setFontSize(6);
  const promedioValor = certificado?.promedioGeneral != null
    ? String(certificado.promedioGeneral)
    : 'N/A';
  const promedioValorWidth = doc.getTextWidth(promedioValor);
  doc.text(promedioValor, subColPromedioX
    + ((subColWidth - 10) - promedioValorWidth) / 2, promedioValorY);

  doc.setFillColor(252, 133, 32);
  doc.rect(subColTipoX, promedioTipoY, subColWidth - 10, 16, 'F');
  doc.setFont('Garet', 'bold');
  doc.setFontSize(5.5);
  const tipoText = 'Tipo de Certificado';
  const tipoLines = doc.splitTextToSize(tipoText, subColWidth - 14);
  let tipoTextY = promedioTipoY + 7;
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
  const textoDescriptivo = `Cursó y aprobó las asignaturas que se consignan en el plan de estudios ${certificado?.nivelId === 6 ? 'del' : 'de la'} ${certificado?.nombreNivel?.toUpperCase() || ''}EN ${certificado?.carrera?.toUpperCase() || ''}.`;
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

  const dibujarHeaders = (yPos, mostrarColumnaDerecha = true) => {
    doc.setFont('Garet', 'bold');
    doc.setFontSize(5);

    doc.text('ASIGNATURAS', xAsignaturaIzq + 2, yPos);
    doc.text('PERIODO', xPeriodoIzq + (colPeriodoAncho / 2) - (doc.getTextWidth('PERIODO') / 2), yPos);
    doc.text('TIPO', xTipoIzq + (colTipoAncho / 2) - (doc.getTextWidth('TIPO') / 2), yPos);
    doc.text('NÚM', xNumIzq + (colNumAncho / 2) - (doc.getTextWidth('NÚM') / 2), yPos);
    doc.setFontSize(4);
    doc.text('CALIFICACIÓN\nLETRA', xLetraIzq + 2, yPos - 1);

    if (mostrarColumnaDerecha) {
      doc.setFontSize(5);
      doc.text('ASIGNATURAS', xAsignaturaDer + 2, yPos);
      doc.text('PERIODO', xPeriodoDer + (colPeriodoAncho / 2) - (doc.getTextWidth('PERIODO') / 2), yPos);
      doc.text('TIPO', xTipoDer + (colTipoAncho / 2) - (doc.getTextWidth('TIPO') / 2), yPos);
      doc.text('NÚM', xNumDer + (colNumAncho / 2) - (doc.getTextWidth('NÚM') / 2), yPos);
      doc.setFontSize(4);
      doc.text('CALIFICACIÓN\nLETRA', xLetraDer + 2, yPos - 1);
    }
  };

  const gradosOriginales = certificado?.grados || [];
  const gradosOrdenados = ordenarGradosYAsignaturas(gradosOriginales);
  const grados = identificarOptativas(gradosOrdenados);
  const margenInferior = 225;
  const altoFila = 5.5;

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

      const ocultarDatos = asig.ocultarDatosPorOptativa === true;

      const periodo = ocultarDatos ? '-----' : String(asig.periodo || '');
      const periodoWidth = doc.getTextWidth(periodo);
      doc.text(periodo, xPeriodo + (colPeriodoAncho / 2) - (periodoWidth / 2), yPos);

      let tipoTexto = '-----';
      if (!ocultarDatos) {
        if (asig.tipo === 2 || asig.tipo === '2') {
          tipoTexto = 'EXTRA';
        } else if (asig.tipo === 1 || asig.tipo === '1') {
          tipoTexto = 'ORD';
        } else {
          tipoTexto = String(asig.tipo || 'ORD');
        }
      }
      const tipoWidth = doc.getTextWidth(tipoTexto);
      doc.text(tipoTexto, xTipo + (colTipoAncho / 2) - (tipoWidth / 2), yPos);

      const calNum = ocultarDatos ? '--' : String(asig.calificacion || '');
      const calNumWidth = doc.getTextWidth(calNum);
      doc.text(calNum, xNum + (colNumAncho / 2) - (calNumWidth / 2), yPos);

      let calLetra = '---------------';
      if (!ocultarDatos) {
        const esDecimal = certificado?.calificacionDecimal === 1;
        calLetra = asig.calificacionLetra || calificacionALetras(asig.calificacion, esDecimal) || '';
      }
      doc.text(String(calLetra), xLetra + 2, yPos);

      yPos += altoFila * Math.max(1, nombreAsigLines.length);
    });

    yPos += 2;
    return yPos;
  };

  const PAGINA_SIGUIENTE_DATOS_CERT_Y = 125;
  const PAGINA_SIGUIENTE_TEXTO_DESC_Y = PAGINA_SIGUIENTE_DATOS_CERT_Y + 20;
  const PAGINA_SIGUIENTE_TABLA_Y = PAGINA_SIGUIENTE_TEXTO_DESC_Y + 15;

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

    const nuevoDatosCertificadoY = PAGINA_SIGUIENTE_DATOS_CERT_Y;

    doc.setFillColor(252, 133, 32);
    doc.rect(blockX, nuevoDatosCertificadoY, blockWidth, 14, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFont('Garet', 'bold');
    doc.setFontSize(8);
    doc.text(datosCertText, blockX
      + (blockWidth - datosCertWidth) / 2, nuevoDatosCertificadoY + 10);

    const nuevoTextoDescriptivoY = PAGINA_SIGUIENTE_TEXTO_DESC_Y;
    doc.setFont('Garet', 'normal');
    doc.setFontSize(6);
    doc.text(textoDescriptivoLines, blockX, nuevoTextoDescriptivoY);

    const nuevoTablaY = PAGINA_SIGUIENTE_TABLA_Y;

    dibujarHeaders(nuevoTablaY, mostrarColumnaDerecha);

    return nuevoTablaY + 8;
  };

  const construirPaginas = () => {
    const paginas = [];
    let indice = 0;
    let esPrimeraPagina = true;

    while (indice < grados.length) {
      const yInicio = esPrimeraPagina ? (tablaY + 8) : (PAGINA_SIGUIENTE_TABLA_Y + 8);
      const pagina = { izquierda: [], derecha: [] };
      let yIzq = yInicio;
      let yDer = yInicio;

      while (indice < grados.length) {
        const grado = grados[indice];
        const alturaGrado = calcularAlturaGrado(grado);
        const seAgota = (yIzq + alturaGrado) > (height - margenInferior);

        if (seAgota) {
          if (pagina.izquierda.length === 0) {
            pagina.izquierda.push(grado);
            indice += 1;
          }
          break;
        }

        pagina.izquierda.push(grado);
        yIzq += alturaGrado;
        indice += 1;
      }

      while (indice < grados.length) {
        const grado = grados[indice];
        const alturaGrado = calcularAlturaGrado(grado);
        const seAgota = (yDer + alturaGrado) > (height - margenInferior);

        if (seAgota) {
          if (pagina.derecha.length === 0) {
            pagina.derecha.push(grado);
            indice += 1;
          }
          break;
        }

        pagina.derecha.push(grado);
        yDer += alturaGrado;
        indice += 1;
      }

      paginas.push(pagina);
      esPrimeraPagina = false;
    }

    return paginas;
  };

  const paginas = construirPaginas();

  for (let p = 0; p < paginas.length; p += 1) {
    const pagina = paginas[p];
    const hayColumnaDerecha = pagina.derecha.length > 0;

    let yIzqActual;
    let yDerActual;

    if (p === 0) {
      dibujarHeaders(tablaY, hayColumnaDerecha);
      yIzqActual = tablaY + 8;
      yDerActual = tablaY + 8;
    } else {
      // eslint-disable-next-line no-await-in-loop
      const nuevoY = await addNewPage(hayColumnaDerecha);
      yIzqActual = nuevoY;
      yDerActual = nuevoY;
    }

    pagina.izquierda.forEach((grado) => {
      yIzqActual = dibujarGrado(
        grado,
        xAsignaturaIzq,
        xPeriodoIzq,
        xTipoIzq,
        xNumIzq,
        xLetraIzq,
        yIzqActual,
      );
    });

    pagina.derecha.forEach((grado) => {
      yDerActual = dibujarGrado(
        grado,
        xAsignaturaDer,
        xPeriodoDer,
        xTipoDer,
        xNumDer,
        xLetraDer,
        yDerActual,
      );
    });
  }

  await agregarFooter(doc, certificado);

  return doc.output('arraybuffer');
}

module.exports = { GenerarCertificado };
