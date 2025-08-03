const { checkers } = require('@siiges-services/shared');

const SITUACION_INACTIVO = 2;

const processSolicitudRevEquiv = (
  findOneSolicitudRevEquivQuery,
  findOneAlumnoQuery,
  createAlumnoQuery,
) => async (identifierObj, data) => {
  const { matricula } = data;
  const include = [{
    association: 'interesado',
    include: [
      { association: 'persona', include: [{ association: 'domicilio' }] },
      { association: 'institucionProcedencia' },
      {
        association: 'institucionDestino',
        include: [{
          association: 'institucionDestinoPrograma',
          include: [{
            association: 'programa',
            include: [{
              association: 'plantel',
              include: [{ association: 'institucion' }],
            }],
          }],
        }],
      },
      {
        association: 'asignaturasAntecedenteEquivalente',
        include: [{
          association: 'asignaturaEquivalentePrograma',
          include: [{ association: 'asignatura' }],
        }],
      },
    ],
  }];

  const solicitudRevEquiv = await findOneSolicitudRevEquivQuery(
    identifierObj,
    { include, strict: false },
  );

  checkers.throwErrorIfDataIsFalsy(solicitudRevEquiv, 'solicitudes-rev-equiv', identifierObj.id);

  if (!solicitudRevEquiv?.institucionDestino?.institucionDestinoPrograma?.programaId) {
    throw new Error('Programa no asociado a la solicitud');
  }

  const existingAlumno = await findOneAlumnoQuery({
    matricula,
    programaId: solicitudRevEquiv.institucionDestino.institucionDestinoPrograma.programaId,
  });

  if (existingAlumno) {
    throw new Error(`Ya existe un alumno con la matricula ${matricula} en el programa ${solicitudRevEquiv.institucionDestino.institucionDestinoPrograma.programaId}`);
  }

  const alumnoData = {
    personaId: solicitudRevEquiv.interesado.personaId,
    situacionId: SITUACION_INACTIVO,
    programaId: solicitudRevEquiv.institucionDestino.institucionDestinoPrograma.programaId,
    matricula,
    estatus: 1,
    tipoTramiteId: solicitudRevEquiv.tipoTramiteId,
  };

  console.log(alumnoData);

  // const newAlumno = await createAlumnoQuery(alumnoData);

  return alumnoData;
};

module.exports = processSolicitudRevEquiv;
