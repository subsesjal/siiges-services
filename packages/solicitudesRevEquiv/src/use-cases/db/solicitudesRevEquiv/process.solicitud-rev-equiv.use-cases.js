/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { checkers, Logger } = require('@siiges-services/shared');

const SITUACION_INACTIVO = 2;

const processSolicitudRevEquiv = (
  findOneSolicitudRevEquivQuery,
  findOneAlumnoQuery,
  createAlumnoQuery,
  findOneCicloEscolarQuery,
  createCicloEscolarQuery,
  findOneGrupoQuery,
  createGrupoQuery,
  findOneAlumnoGrupoQuery,
  createAlumnoGrupoQuery,
) => async (identifierObj, data) => {
  const solicitudRevEquiv = await findOneSolicitudRevEquivQuery(identifierObj, {
    include: [{
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
    }],
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(solicitudRevEquiv, 'solicitudes-rev-equiv', identifierObj.id);

  const solicitudJson = solicitudRevEquiv.toJSON();
  const institucionDestino = solicitudJson?.interesado?.institucionDestino;

  const programaId = institucionDestino?.institucionDestinoPrograma?.programaId;
  if (!programaId) {
    throw new Error('Programa no asociado a la solicitud');
  }

  const { matricula } = data;

  const existingAlumno = await findOneAlumnoQuery({ matricula, programaId });
  if (existingAlumno) {
    throw new Error(`Ya existe un alumno con la matricula ${matricula} en el programa ${programaId}`);
  }

  const alumnoData = {
    personaId: solicitudJson.interesado.personaId,
    situacionId: SITUACION_INACTIVO,
    programaId,
    matricula,
    estatus: 1,
    tipoTramiteId: solicitudJson.tipoTramiteId,
  };
  // Crear el nuevo alumno (comentado para propósitos de depuración)
  const newAlumno = !existingAlumno ? await createAlumnoQuery(alumnoData) : existingAlumno;

  const cicloEquivalente = await findOneCicloEscolarQuery({ programaId, nombre: 'EQUIV' });
  if (!cicloEquivalente) {
    await createCicloEscolarQuery({ programaId, nombre: 'EQUIV' });
  }

  const asignaturasAntecedenteEquivalente = solicitudJson
    ?.interesado
    ?.asignaturasAntecedenteEquivalente;
  const errores = [];

  const asignaturasCalificacion = [];

  for (const obj of asignaturasAntecedenteEquivalente) {
    const calificacion = obj.calificacionEquivalente;
    const asignatura = obj.asignaturaEquivalentePrograma?.asignatura;

    Logger.info('Asignatura');
    Logger.info(JSON.stringify(asignatura));

    let grupo = await findOneGrupoQuery({
      cicloEscolarId: cicloEquivalente.id,
      gradoId: asignatura.gradoId,
      turnoId: 1,
      descripcion: 'UNICO',
    });

    if (grupo) {
      const alumnoGrupo = await findOneAlumnoGrupoQuery({
        alumnoId: newAlumno.id,
        grupoId: grupo.id,
      });

      if (!alumnoGrupo) {
        errores.push(`Alumno no encontrado en el grupo ${grupo.id}`);
        await createAlumnoGrupoQuery({
          alumnoId: newAlumno.id,
          grupoId: grupo.id,
        });
      }
    }

    if (!grupo) {
      errores.push(`Grupo no encontrado para el ciclo escolar ${cicloEquivalente.id}, grado ${asignatura.gradoId}, descripcion UNICO`);

      grupo = await createGrupoQuery({
        cicloEscolarId: cicloEquivalente.id,
        gradoId: asignatura.gradoId,
        turnoId: 1,
        descripcion: 'UNICO',
      });

      await createAlumnoGrupoQuery({
        alumnoId: newAlumno.id,
        grupoId: grupo.id,
      });
    }

    asignaturasCalificacion.push({
      alumnoId: newAlumno.id,
      grupoId: grupo?.id,
      asignaturaId: asignatura.id,
      calificacion,
      tipo: 1,
      fechaExamen: new Date(),
    });
  }

  return {
    alumnoData,
    errores,
    asignaturasCalificacion,
  };
};

module.exports = processSolicitudRevEquiv;
