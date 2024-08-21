const { checkers } = require('@siiges-services/shared');
const boom = require('@hapi/boom');
const { getFojaId } = require('../../../utils/get-foja-id.utils');
const { getLibroId } = require('../../../utils/get-libro-id.utils');
const { createFolioDocumento } = require('../../../utils/create-folio-documento.utils');

const ESTATUS_FOLIOS_ASIGNADOS = 3;

const includeSolicitud = [
  {
    association: 'programa',
    include: [{ association: 'nivel' }],
  },
  { association: 'tipoDocumento' },
  { association: 'tipoSolicitudFolio' },
];

const includeFolios = [
  {
    association: 'alumno',
    include: [{ association: 'persona' }],
  },
  {
    association: 'folioDocumentoAlumno',
    include: [
      { association: 'foja' },
      { association: 'libro' },
    ],
  },
];

/**
 * Obtiene la solicitud de folio con sus asociaciones necesarias.
 *
 * @param {Function} findOneSolicitudFolioQuery - Función para obtener una solicitud de folio.
 * @param {Object} identifierObj - Objeto con los identificadores de la solicitud.
 * @param {Array} include - Arreglo de asociaciones a incluir en la consulta.
 * @returns {Object} - La solicitud de folio encontrada.
 */
async function getSolicitudFolio(findOneSolicitudFolioQuery, identifierObj, include) {
  const solicitudFolio = await findOneSolicitudFolioQuery(identifierObj, { include });
  checkers.throwErrorIfDataIsFalsy(solicitudFolio, 'solicitudes_folios', identifierObj.id);
  return solicitudFolio;
}

/**
 * Verifica si ya existen folios para los alumnos de una solicitud de folio.
 *
 * @param {Array} Arreglo de objetos que representan la solicitud de folio de los alumnos.
 * @param {Function} Función para encontrar un folio documento de alumno.
 * @returns {Boolean} - Verdadero si ya existe algún folio, falso en caso contrario.
 */
async function checkExistingFolios(solicitudFoliosAlumnos, findOneFolioDocumentoAlumnoQuery) {
  const hasExistingFolio = await Promise.all(
    solicitudFoliosAlumnos.map(async ({ id }) => {
      const folio = await findOneFolioDocumentoAlumnoQuery({ solicitudFolioAlumnoId: id });
      return !!folio;
    }),
  );

  return hasExistingFolio.some((result) => result);
}

/**
 * Asigna un folio a cada alumno de una solicitud de folio.
 *
 * @param {Object} La solicitud de folio que contiene los datos del programa.
 * @param {Array} Arreglo de objetos que representan la solicitud de folio de los alumnos.
 * @param {Object} Objeto que representa el libro donde se registran los folios.
 * @param {Function} Función para encontrar todas las fojas.
 * @param {Function} Función para crear una foja.
 * @param {Function} Función para contar los folios de documentos de alumnos.
 * @param {Function} Función para crear un folio documento de alumno.
 */
async function assignFoliosToAlumnos(
  solicitudFolio,
  solicitudFoliosAlumnos,
  libro,
  findAllFojaQuery,
  createFojaQuery,
  countFoliosDocumentosAlumnosQuery,
  createFolioDocumentoAlumnoQuery,
) {
  await solicitudFoliosAlumnos.reduce(async (promise, solicitudFolioAlumno) => {
    await promise;

    const foja = await getFojaId(
      libro.id,
      findAllFojaQuery,
      createFojaQuery,
      countFoliosDocumentosAlumnosQuery,
    );

    const folioDocumento = await createFolioDocumento({
      nivel: solicitudFolio.programa.nivel.nombre,
      tipoDocumento: solicitudFolio.tipoDocumento.nombre,
      tipoSolicitudFolio: solicitudFolio.tipoSolicitudFolio.nombre,
      libro,
      año: libro.descripcion,
      countFolios: countFoliosDocumentosAlumnosQuery,
    });

    const folioSchema = {
      solicitudFolioAlumnoId: solicitudFolioAlumno.id,
      alumnoId: solicitudFolioAlumno.alumnoId,
      tipoDocumentoId: solicitudFolio.tipoDocumentoId,
      libroId: libro.id,
      fojaId: foja.id,
      folioDocumento,
    };

    await createFolioDocumentoAlumnoQuery(folioSchema);

    return Promise.resolve();
  }, Promise.resolve());
}

/**
 * Asigna folios a los alumnos de una solicitud de folio.
 *
 * @returns {Function} Función que asigna los folios.
 */
const assignFoliosAlumnos = (
  findOneSolicitudFolioQuery,
  updateSolicitudFolioQuery,
  findAllSolicitudFolioAlumnosQuery,
  findOneFolioDocumentoAlumnoQuery,
  createFolioDocumentoAlumnoQuery,
  countFoliosDocumentosAlumnosQuery,
  findOneLibroQuery,
  createLibroQuery,
  findAllFojaQuery,
  createFojaQuery,
) => async (identifierObj) => {
  const solicitudFolio = await getSolicitudFolio(
    findOneSolicitudFolioQuery,
    identifierObj,
    includeSolicitud,
  );

  const solicitudFoliosAlumnos = await findAllSolicitudFolioAlumnosQuery({
    solicitudFolioId: solicitudFolio.id,
  });

  const existingFolios = await checkExistingFolios(
    solicitudFoliosAlumnos,
    findOneFolioDocumentoAlumnoQuery,
  );

  if (existingFolios) {
    throw boom.conflict('Folios already assigned to this request.');
  }

  const libro = await getLibroId(
    solicitudFolio.tipoDocumentoId,
    findOneLibroQuery,
    createLibroQuery,
  );

  await assignFoliosToAlumnos(
    solicitudFolio,
    solicitudFoliosAlumnos,
    libro,
    findAllFojaQuery,
    createFojaQuery,
    countFoliosDocumentosAlumnosQuery,
    createFolioDocumentoAlumnoQuery,
  );

  await updateSolicitudFolioQuery(
    identifierObj,
    { estatusSolicitudFolio: ESTATUS_FOLIOS_ASIGNADOS },
  );

  const solicitudesFoliosAlumnosUpdated = await findAllSolicitudFolioAlumnosQuery(
    { solicitudFolioId: solicitudFolio.id },
    { include: includeFolios, strict: false },
  );

  return solicitudesFoliosAlumnosUpdated;
};

module.exports = assignFoliosAlumnos;
