/* eslint-disable no-unused-vars */
const fs = require('fs');
const path = require('path');
const boom = require('@hapi/boom');

const findFileTitulo = (
  findOneTituloElectronicoQuery,
  findOneFileQuery,
  GenerarTitulo,
) => async (entidadId, tipoDocumento) => {
  const tituloElectronico = await findOneTituloElectronicoQuery(
    { id: entidadId },
  );

  if (!tituloElectronico) {
    throw boom.conflict('No se encuentra un título electrónico registrado.');
  }

  const fileXML = await findOneFileQuery({
    tipoDocumentoId: 67,
    tipoEntidadId: 18,
    entidadId,
  });

  if (!fileXML) {
    throw boom.conflict('No se encuentra un título electrónico registrado.');
  }

  const ruta = path.join(process.env.PATH_FILE, 'public', fileXML?.ubicacion);

  const fileStringXML = fs.readFileSync(ruta, 'utf8');

  const file = await GenerarTitulo(tituloElectronico, fileStringXML);
  return Buffer.from(file);
};

module.exports = { findFileTitulo };
