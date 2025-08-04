/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const { checkers } = require('@siiges-services/shared');

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
  createCalificacionQuery,
  findOneCalificacionQuery,
  findEquivQuery,
  createEquivQuery,
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

  const {
    matricula, folioExpediente, folioResolucion, fechaResolucion,
  } = data;

  if (!matricula || !folioExpediente || !folioResolucion || !fechaResolucion) {
    throw new Error('Datos incompletos para procesar la solicitud de equivalencia');
  }

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

  const equivalenciaInterna = await findEquivQuery({ alumnoId: newAlumno.id });
  if (!equivalenciaInterna) {
    await createEquivQuery({
      alumnoId: newAlumno.id,
      folioExpediente,
      folioResolucion,
      fechaResolucion,
    });
  }

  const cicloEquivalente = await findOneCicloEscolarQuery({ programaId, nombre: 'EQUIV' });
  if (!cicloEquivalente) {
    await createCicloEscolarQuery({ programaId, nombre: 'EQUIV' });
  }

  const asignaturasAntecedenteEquivalente = solicitudJson
    ?.interesado
    ?.asignaturasAntecedenteEquivalente;

  const asignaturasCalificacion = [];

  for (const obj of asignaturasAntecedenteEquivalente) {
    const calificacion = obj.calificacionEquivalente;
    const asignatura = obj.asignaturaEquivalentePrograma?.asignatura;

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
        await createAlumnoGrupoQuery({
          alumnoId: newAlumno.id,
          grupoId: grupo.id,
        });
      }
    }

    if (!grupo) {
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

  const calificaciones = await Promise.all(
    asignaturasCalificacion.map(async (calificacion) => {
      const existingCalificacion = await findOneCalificacionQuery({
        alumnoId: calificacion.alumnoId,
        asignaturaId: calificacion.asignaturaId,
        grupoId: calificacion.grupoId,
      });

      if (!existingCalificacion) {
        return createCalificacionQuery(calificacion);
      }

      return existingCalificacion;
    }),
  );

  return calificaciones;
};

module.exports = processSolicitudRevEquiv;
