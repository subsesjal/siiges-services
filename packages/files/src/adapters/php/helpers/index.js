const { spawn } = require('child_process');
const path = require('path');
const { Logger } = require('@siiges-services/shared');

const FORMATOS_MAPPING = {
  FDA01: 'fda01.php',
  HISTORIAL_ACADEMICO: 'fhistorial.php',
};

const createPhpFile = async (data, tipoDocumento) => new Promise((resolve, reject) => {
  const filePath = path.join(__dirname, '../formatos');
  const phpScriptPath = path.join(filePath, `${FORMATOS_MAPPING[tipoDocumento]}`);
  const child = spawn('php', [phpScriptPath]);

  let pdfBuffer = Buffer.alloc(0);
  let errorOutput = '';

  child.stdout.on('data', (chunk) => {
    pdfBuffer = Buffer.concat([pdfBuffer, chunk]);
  });

  child.stderr.on('data', (err) => {
    Logger.error('[PHP STDERR]:', err.toString());

    errorOutput += err.toString();
  });

  child.on('close', (code) => {
    if (code === 0) {
      resolve(pdfBuffer);
    } else {
      reject(new Error(`PHP exited with code ${code}\n${errorOutput}`));
    }
  });

  child.stdin.write(JSON.stringify(data));
  child.stdin.end();
});

module.exports = {
  createPhpFile,
};
