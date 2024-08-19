const { checkers } = require('@siiges-services/shared');
const { getFojaId } = require('../../../utils/get-foja-id.utils');
const { getLibroId } = require('../../../utils/get-libro-id.utils');
// const { createFolioDocumento } = require('../../../utils/create-folio-documento.utils');

const assignFoliosAlumnos = (
  findOneSolicitudFolioQuery,
  findAllSolicitudFolioAlumnosQuery,
  createFolioDocumentoAlumnoQuery,
  countFoliosDocumentosAlumnosQuery,
  findOneLibroQuery,
  createLibroQuery,
  findAllFojaQuery,
  createFojaQuery,
) => async (identifierObj) => {
  const solicitudFolio = await findOneSolicitudFolioQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(solicitudFolio, 'solicitudes_folios', identifierObj.id);

  const solicitudFoliosAlumnos = await findAllSolicitudFolioAlumnosQuery({
    solicitudFolioId: solicitudFolio.id,
  });

  const libro = await getLibroId(
    solicitudFolio.tipoDocumentoId,
    findOneLibroQuery,
    createLibroQuery,
  );

  // Use reduce to sequentially process each solicitudFolioAlumno
  await solicitudFoliosAlumnos.reduce(async (promise, solicitudFolioAlumno) => {
    await promise;

    const foja = await getFojaId(
      libro.id,
      findAllFojaQuery,
      createFojaQuery,
      countFoliosDocumentosAlumnosQuery,
    );

    const folioSchema = {
      solicitudFolioAlumnoId: solicitudFolioAlumno.id,
      alumnoId: solicitudFolioAlumno.alumnoId,
      tipoDocumentoId: solicitudFolio.tipoDocumentoId,
      libroId: libro.id,
      fojaId: foja.id,
      folioDocumento: `FA${libro.nombre}${foja.nombre}${solicitudFolioAlumno.alumnoId}`,
    };

    await createFolioDocumentoAlumnoQuery(folioSchema);

    return Promise.resolve();
  }, Promise.resolve());

  return solicitudFoliosAlumnos;
};

module.exports = assignFoliosAlumnos;
