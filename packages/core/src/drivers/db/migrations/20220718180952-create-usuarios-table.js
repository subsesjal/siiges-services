// SIIGES 2.0
const { CICLO_TABLE, CicloSchema } = require('../models/ciclo');
const { DOMICILIO_TABLE, DomicilioSchema } = require('../models/domicilio');
const { DILIGENCIA_TABLE, DiligenciaSchema } = require('../models/diligencia');
const { ESTATUS_SOLICITUD_TABLE, EstatusSolicitudSchema } = require('../models/estatusSolicitud');
const { ESTADO_TABLE, EstadoSchema } = require('../models/estado');
const { FILE_TABLE, FileSchema } = require('../models/file');
const { TIPO_INSTITUCION_TABLE, TipoInstitucionSchema } = require('../models/tipoInstitucion');
const { INSTITUCION_TABLE, InstitucionSchema } = require('../models/institucion');
const { MODALIDAD_TABLE, ModalidadSchema } = require('../models/modalidad');
const { MUNICIPIO_TABLE, MunicipioSchema } = require('../models/municipio');
const { NIVEL_TABLE, NivelSchema } = require('../models/nivel');
const { PAIS_TABLE, PaisSchema } = require('../models/pais');
const { PERSONA_TABLE, PersonaSchema } = require('../models/persona');
const { PLANTEL_TABLE, PlantelSchema } = require('../models/plantel');
const { PROGRAMA_TABLE, ProgramaSchema } = require('../models/programa');
const { TURNO_TABLE, TurnoSchema } = require('../models/turno');
const { PROGRAMA_TURNO_TABLE, ProgramaTurnoSchema } = require('../models/programaTurno');
const { RATIFICACION_NOMBRE_TABLE, RatificacionNombreSchema } = require('../models/ratificacionNombre');
const { REPRESENTANTE_TABLE, RepresentanteSchema } = require('../models/representante');
const { ROL_TABLE, RolSchema } = require('../models/rol');
const { SOLICITUD_TABLE, SolicitudSchema } = require('../models/solicitud');
const { TIPO_INMUEBLE_TABLE, TipoInmuebleSchema } = require('../models/tipoInmueble');
const { TIPO_SOLICITUD_TABLE, TipoSolicitudSchema } = require('../models/tipoSolicitud');
const { USUARIO_TABLE, UsuarioSchema } = require('../models/usuario');
const { USUARIO_USUARIO_TABLE, UsuarioUsuarioSchema } = require('../models/usuarioUsuario');
const { RECTOR_TABLE, RectorSchema } = require('../models/rector');
const { DIRECTOR_TABLE, DirectorSchema } = require('../models/director');
const { DOCENTE_TABLE, DocenteSchema } = require('../models/docente');
const { TIPO_INSTALACION_TABLE, TipoInstalacionSchema } = require('../models/tipoInstalacion');
const { AREA_TABLE, AreaSchema } = require('../models/area');
const { ASIGNATURA_TABLE, AsignaturaSchema } = require('../models/asignatura');
const { ASIGNATURA_DOCENTE_TABLE, AsignaturaDocenteSchema } = require('../models/asignaturaDocente');
const { SECCION_TABLE, SeccionSchema } = require('../models/seccion');
const { SOLICITUD_SECCION_TABLE, SolicitudSeccionSchema } = require('../models/solicitudSeccion');
const { HIGIENE_TABLE, HigieneSchema } = require('../models/higiene');
const { PLANTEL_HIGIENE_TABLE, PlantelHigieneSchema } = require('../models/plantelHigiene');
const { INFRAESTRUCTURA_TABLE, InfraestructuraSchema } = require('../models/infraestructura');
const { INFRAESTRUCTURA_PROGRAMA_TABLE, InfraestructuraProgramaSchema } = require('../models/infraestructuraPrograma');
const { ASIGNATURA_INFRAESTRUCTURA_TABLE, AsignaturaInfraestructuraSchema } = require('../models/asignaturaInfraestructura');
const { ESTATUS_INSPECCION_TABLE, EstatusInspeccionSchema } = require('../models/estatusInspeccion');
const { INSPECCION_APARTADO_TABLE, InspeccionApartadoSchema } = require('../models/inspeccionApartado');
const { INSPECCION_CATEGORIA_TABLE, InspeccionCategoriaSchema } = require('../models/inspeccionCategoria');
const { INSPECCION_TIPO_PREGUNTA_TABLE, InspeccionTipoPreguntaSchema } = require('../models/inspeccionTipoPregunta');
const { INSPECCION_PREGUNTA_TABLE, InspeccionPreguntaSchema } = require('../models/inspeccionPregunta');
const { INSPECCION_TABLE, InspeccionSchema } = require('../models/inspeccion');
const { INSPECCION_OBSERVACION_TABLE, InspeccionObservacionSchema } = require('../models/inspeccionObservacion');
const { INSPECCION_INSPECCION_PREGUNTA_TABLE, InspeccionInspeccionPreguntaSchema } = require('../models/inspeccionInspeccionPregunta');
const { INSPECTOR_TABLE, InspectorSchema } = require('../models/inspector');
const { INSPECTOR_PROGRAMA_TABLE, InspectorProgramaSchema } = require('../models/inspectorPrograma');
const { NOTIFICACION_TABLE, NotificacionSchema } = require('../models/notificacion');
const { TRAYECTORIA_TABLE, TrayectoriaSchema } = require('../models/trayectoria');
const { SITUACION_TABLE, SituacionSchema } = require('../models/situacion');
const { TIPO_TRAMITE_TABLE, TipoTramiteSchema } = require('../models/tipoTramite');
const { ALUMNO_TABLE, AlumnoSchema } = require('../models/alumno');
const { ALUMNO_TIPO_TRAMITE_TABLE, AlumnoTipoTramiteSchema } = require('../models/alumnoTipoTramite');
const { EDIFICIO_NIVEL_TABLE, EdificioNivelSchema } = require('../models/edificioNivel');
const { PLANTEL_EDIFICIO_NIVEL_TABLE, PlantelEdificioNivelSchema } = require('../models/plantelEdificioNivel');
const { SALUD_INSTITUCION_TABLE, SaludInstitucionSchema } = require('../models/saludInstitucion');
const { SEGURIDAD_SISTEMA_TABLE, SeguridadSistemaSchema } = require('../models/seguridadSistema');
const { PLANTEL_SEGURIDAD_SISTEMA_TABLE, PlantelSeguridadSistemaSchema } = require('../models/plantelSeguridadSistema');
const { CUMPLIMIENTO_TABLE, CumplimientoSchema } = require('../models/cumplimiento');
const { EVALUACION_TABLE, EvaluacionSchema } = require('../models/evaluacion');
const { EVALUADOR_TABLE, EvaluadorSchema } = require('../models/evaluador');
const { GRADO_TABLE, GradoSchema } = require('../models/grado');
const { CICLO_ESCOLAR_TABLE, CicloEscolarSchema } = require('../models/cicloEscolar');
const { GRUPO_TABLE, GrupoSchema } = require('../models/grupo');
const { FORMACION_TABLE, FormacionSchema } = require('../models/formacion');
const { FORMACION_RECTOR_TABLE, FormacionRectorSchema } = require('../models/formacionRector');
const { FORMACION_DIRECTOR_TABLE, FormacionDirectorSchema } = require('../models/formacionesDirectores');
const { FORMACION_DOCENTE_TABLE, FormacionDocenteSchema } = require('../models/formacionesDocentes');
const { ALUMNO_GRUPO_TABLE, AlumnoGrupoSchema } = require('../models/alumnoGrupo');
const { CALIFICACION_TABLE, CalificacionSchema } = require('../models/calificacion');
const { VALIDACION_TABLE, ValidacionSchema } = require('../models/validacion');
const { SITUACION_VALIDACION_TABLE, SituacionValidacionSchema } = require('../models/situacionValidacion');
const { TIPO_VALIDACION_TABLE, TipoValidacionSchema } = require('../models/tipoValidacion');
const { ESTATUS_VIGILANCIA_TABLE, EstatusVigilanciaSchema } = require('../models/estatusVigilancia');
const { VIGILANCIA_APARTADO_TABLE, VigilanciaApartadoSchema } = require('../models/vigilanciaApartado');
const { VIGILANCIA_CATEGORIA_TABLE, VigilanciaCategoriaSchema } = require('../models/vigilanciaCategoria');
const { VIGILANCIA_TIPO_PREGUNTA_TABLE, VigilanciaTipoPreguntaSchema } = require('../models/vigilanciaTipoPregunta');
const { VIGILANCIA_PREGUNTA_TABLE, VigilanciaPreguntaSchema } = require('../models/vigilanciaPregunta');
const { VIGILANCIA_TABLE, VigilanciaSchema } = require('../models/vigilancia');
const { VIGILANCIA_OBSERVACION_TABLE, VigilanciaObservacionSchema } = require('../models/vigilanciaObservacion');
const { VIGILANCIA_VIGILANCIA_PREGUNTA_TABLE, VigilanciaVigilanciaPreguntaSchema } = require('../models/vigilanciaVigilanciaPregunta');
const { VIGILANTE_TABLE, VigilanteSchema } = require('../models/vigilante');
const { VIGILANTE_VIGILANCIA_TABLE, VigilanteVigilanciaSchema } = require('../models/vigilanteVigilancia');
const { SESION_TABLE, SesionSchema } = require('../models/sesion');
const { PERIODO_TABLE, PeriodoSchema } = require('../models/periodo');
const { ORGANO_COLEGIADO_TABLE, OrganoColegiadoSchema } = require('../models/organoColegiado');
const { ACUERDO_TABLE, AcuerdoSchema } = require('../models/acuerdo');
const { PLAN_MAESTRO_TABLE, PlanMaestroSchema } = require('../models/planMaestro');
const { PROYECTO_TABLE, ProyectoSchema } = require('../models/proyecto');
const { TIPO_PROYECTO_TABLE, TipoProyectoSchema } = require('../models/tipoProyecto');
const { PROYECTO_TIPO_PROYECTO_TABLE, ProyectoTipoProyectoSchema } = require('../models/proyectoTipoProyecto');
const { CONTRATO_TABLE, ContratoSchema } = require('../models/contrato');
const { RESPONSABLE_OBRA_TABLE, ResponsableObraSchema } = require('../models/responsableObra');
const { RESPONSABLE_PLANEACION_TABLE, ResponsablePlaneacionSchema } = require('../models/responsablePlaneacion');
const { PROYECTO_ESPACIO_TABLE, ProyectoEspacioSchema } = require('../models/proyectoEspacio');
const { PRESUPUESTO_EGRESO_TABLE, PresupuestoEgresoSchema } = require('../models/presupuestoEgreso');
const { PRESUPUESTO_TABLE, PresupuestoSchema } = require('../models/presupuesto');
const { TIPO_PRESUPUESTO_TABLE, TipoPresupuestoSchema } = require('../models/tipoPresupuesto');
const { TIPO_RECURSO_PRESUPUESTO_TABLE, TipoRecursoPresupuestoSchema } = require('../models/tipoRecursoPresupuesto');
const { TIPO_EGRESO_TABLE, TipoEgresoSchema } = require('../models/tipoEgreso');
const { TIPO_SOLICITUD_FOLIO_TABLE, TipoSolicitudFolioSchema } = require('../models/tipoSolicitudFolio');
const { TIPO_DOCUMENTO_TABLE, TipoDocumentoSchema } = require('../models/tipoDocumento');
const { ESTATUS_SOLICITUD_FOLIO_TABLE, EstatusSolicitudFolioSchema } = require('../models/estatusSolicitudFolio');
const { SOLICITUD_FOLIO_TABLE, SolicitudFolioSchema } = require('../models/solicitudFolio');
const { SOLICITUD_FOLIO_ALUMNO_TABLE, SolicitudFolioAlumnoSchema } = require('../models/solicitudFolioAlumno');
const { LIBRO_TABLE, LibroSchema } = require('../models/libro');
const { FOJA_TABLE, FojaSchema } = require('../models/foja');
const { FOLIO_DOCUMENTO_ALUMNO_TABLE, FolioDocumentoAlumnoSchema } = require('../models/folioDocumentoAlumno');
const { INSTITUCION_DESTINO_TABLE, InstitucionDestinoSchema } = require('../models/institucionDestino');
const { INSTITUCION_DESTINO_PROGRAMA_TABLE, InstitucionDestinoProgramaSchema } = require('../models/institucionDestinoPrograma');
const { INSTITUCION_PROCEDENCIA_TABLE, InstitucionProcedenciaSchema } = require('../models/institucionProcedencia');
const { INTERESADO_TABLE, InteresadoSchema } = require('../models/interesado');
const { ESTATUS_SOLICITUD_REV_EQUIV_TABLE, EstatusSolicitudRevEquivSchema } = require('../models/estatusSolicitudRevEquiv');
const { SOLICITUD_REV_EQUIV_TABLE, SolicitudRevEquivSchema } = require('../models/solicitudRevEquiv');
const { ASIGNATURA_ANTECEDENTE_EQUIVALENTE_TABLE, AsignaturaAntecedenteEquivalenteSchema } = require('../models/asignaturaAntecedenteEquivalente');
const { ASIGNATURA_EQUIVALENTE_PROGRAMA_TABLE, AsignaturaEquivalenteProgramaSchema } = require('../models/asignaturaEquivalentePrograma');
const { FUNDAMENTO_SERVICIO_SOCIAL_TABLE, FundamentoServicioSocialSchema } = require('../models/fundamentoServicioSocial');
const { TIPO_MODALIDAD_TABLE, TipoModalidadSchema } = require('../models/tipoModalidad');
const { MODALIDAD_TITULACION_TABLE, ModalidadTitulacionSchema } = require('../models/modalidadTitulacion');
const { ESTATUS_ALUMNO_BECA_TABLE, EstatusAlumnoBecaSchema } = require('../models/estatusAlumnoBeca');
const { TIPO_ALUMNO_BECA_TABLE, TipoAlumnoBecaSchema } = require('../models/tipoAlumnoBeca');
const { ESTATUS_SOLICITUD_BECA_TABLE, EstatusSolicitudBecaSchema } = require('../models/estatusSolicitudBeca');
const { SOLICITUD_BECA_TABLE, SolicitudBecaSchema } = require('../models/solicitudBeca');
const { SOLICITUD_BECA_ALUMNO_TABLE, SolicitudBecaAlumnoSchema } = require('../models/solicitudBecaAlumno');
const { SOLICITUD_SERVICIO_SOCIAL_TABLE, SolicitudServicioSocialSchema } = require('../models/solicitudServicioSocial');
const { SOLICITUD_SERVICIO_SOCIAL_ALUMNO_TABLE, SolicitudServicioSocialAlumnoSchema } = require('../models/solicitudServicioSocialAlumno');
const { EJE_SERVICIO_SOCIAL_TABLE, EjeServicioSocialSchema } = require('../models/ejeServicioSocial');
const { DIMENSION_SERVICIO_SOCIAL_TABLE, DimensionServicioSocialSchema } = require('../models/dimensionServicioSocial');
const { SECTOR_SERVICIO_SOCIAL_TABLE, SectorServicioSocialSchema } = require('../models/sectorServicioSocial');
const { MODALIDAD_SERVICIO_SOCIAL_TABLE, ModalidadServicioSocialSchema } = require('../models/modalidadServicioSocial');
const { ESTATUS_SOLICITUD_SERVICIO_SOCIAL_TABLE, EstatusSolicitudServicioSocialSchema } = require('../models/estatusSolicitudServicioSocial');
const { TOKEN_RECOVERY_PASSWORD_TABLE, TokenRecoveryPasswordSchema } = require('../models/tokenRecoveryPassword');
const { AUTORIZACION_RECONOCIMIENTO_TABLE, AutorizacionReconocimientoSchema } = require('../models/autorizacionReconocimiento');
const { CARGO_TABLE, CargoSchema } = require('../models/cargo');
const { ALUMNO_TITULO_ELECTRONICO_TABLE, AlumnoTituloElectronicoSchema } = require('../models/alumnosTitulosElectronicos');

// SIIGES 1.0
const { ACADEMIA_TABLE, AcademiaSchema } = require('../models/academias');
const { ALUMNO_OBSERVACION_TABLE, AlumnoObservacionSchema } = require('../models/alumnoObservaciones');
const { ASIGNATURA_HEMEROBIBLIOGRAFICA_TABLE, AsignaturaHemerobibliograficaSchema } = require('../models/asignaturasHemerobibliograficas');
const { ASOCIACION_TABLE, AsociacionSchema } = require('../models/asociaciones');
const { BITACORA_TABLE, BitacoraSchema } = require('../models/bitacoras');
const { CATEGORIA_EVALUACION_PREGUNTA_TABLE, CategoriaEvaluacionPreguntaSchema } = require('../models/categoriasEvaluacionPregunta');
const { DICTAMEN_TABLE, DictamenSchema } = require('../models/dictamenes');
const { DOCUMENTO_TABLE, DocumentoSchema } = require('../models/documentos');
const { EQUIVALENCIA_TABLE, EquivalenciaSchema } = require('../models/equivalencias');
const { ESCALA_TABLE, EscalaSchema } = require('../models/escalas');
const { ESPEJO_TABLE, EspejoSchema } = require('../models/espejos');
const { ESTATUS_CALIFICACION_TABLE, EstatusCalificacionSchema } = require('../models/estatusCalificaciones');
const { EVALUACION_APARTADO_TABLE, EvaluacionApartadoSchema } = require('../models/evaluacionApartados');
const { EVALUACION_PREGUNTA_TABLE, EvaluacionPreguntaSchema } = require('../models/evaluacionPreguntas');
const { EVALUACION_PROCESO_TABLE, EvaluacionProcesoSchema } = require('../models/evaluacionProcesos');
const { EVALUACIONES_EVALUACION_PREGUNTA_TABLE, EvaluacionesEvaluacionPreguntaSchema } = require('../models/evaluacionesEvaluacionPreguntas');
const { EVALUADOR_MODALIDAD_TABLE, EvaluadorModalidadSchema } = require('../models/evaluadoresModalidades');
const { EXPERIENCIA_TABLE, ExperienciaSchema } = require('../models/experiencias');
const { HEMEROBIBLIOGRAFICA_TABLE, HemerobibliograficaSchema } = require('../models/hemerobibliograficas');
const { INSTITUCIONAL_TABLE, InstitucionalSchema } = require('../models/institucionales');
const { MIXTA_NOESCOLARIZADA_TABLE, MixtaNoescolarizadaSchema } = require('../models/mixtaNoEscolarizadas');
const { MODULO_TABLE, ModuloSchema } = require('../models/modulos');
const { MODULO_ROL_TABLE, ModuloRolSchema } = require('../models/modulosRoles');
const { NOTICIA_TABLE, NoticiaSchema } = require('../models/noticias');
const { OFICIO_DETALLE_TABLE, OficioDetalleSchema } = require('../models/oficioDetalles');
const { OFICIO_TABLE, OficioSchema } = require('../models/oficios');
const { PAGO_TABLE, PagoSchema } = require('../models/pagos');
const { PERFIL_TABLE, PerfilSchema } = require('../models/perfiles');
const { PLANTEL_DICTAMEN_TABLE, PlantelDictamenSchema } = require('../models/plantelDictamenes');
const { PROGRAMA_EVALUACION_TABLE, ProgramaEvaluacionSchema } = require('../models/programaEvaluaciones');
const { RESPALDO_TABLE, RespaldoSchema } = require('../models/respaldos');
const { SOLICITUD_ESTADO_SOLICITUD_TABLE, SolicitudEstatusSolicitudSchema } = require('../models/solicitudesEstatusSolicitudes');
const { SOLICITUD_USUARIO_TABLE, SolicitudUsuarioSchema } = require('../models/solicitudes_usuarios');
const { TESTIGO_TABLE, TestigoSchema } = require('../models/testigos');
const { TITULO_ELECTRONICO_TABLE, TituloElectronicoSchema } = require('../models/titulosElectronicos');

module.exports = {
  async up(queryInterface) {
    // SIIGES 2.0
    await queryInterface.createTable(ROL_TABLE, RolSchema);
    await queryInterface.createTable(PAIS_TABLE, PaisSchema);
    await queryInterface.createTable(ESTADO_TABLE, EstadoSchema);
    await queryInterface.createTable(MUNICIPIO_TABLE, MunicipioSchema);
    await queryInterface.createTable(DOMICILIO_TABLE, DomicilioSchema);
    await queryInterface.createTable(PERSONA_TABLE, PersonaSchema);
    await queryInterface.createTable(USUARIO_TABLE, UsuarioSchema);
    await queryInterface.createTable(FILE_TABLE, FileSchema);
    await queryInterface.createTable(TIPO_INSTITUCION_TABLE, TipoInstitucionSchema);
    await queryInterface.createTable(INSTITUCION_TABLE, InstitucionSchema);
    await queryInterface.createTable(TIPO_INMUEBLE_TABLE, TipoInmuebleSchema);
    await queryInterface.createTable(PLANTEL_TABLE, PlantelSchema);
    await queryInterface.createTable(RATIFICACION_NOMBRE_TABLE, RatificacionNombreSchema);
    await queryInterface.createTable(ESTATUS_SOLICITUD_TABLE, EstatusSolicitudSchema);
    await queryInterface.createTable(TIPO_SOLICITUD_TABLE, TipoSolicitudSchema);
    await queryInterface.createTable(SOLICITUD_TABLE, SolicitudSchema);
    await queryInterface.createTable(REPRESENTANTE_TABLE, RepresentanteSchema);
    await queryInterface.createTable(DILIGENCIA_TABLE, DiligenciaSchema);
    await queryInterface.createTable(CICLO_TABLE, CicloSchema);
    await queryInterface.createTable(MODALIDAD_TABLE, ModalidadSchema);
    await queryInterface.createTable(NIVEL_TABLE, NivelSchema);
    await queryInterface.createTable(PROGRAMA_TABLE, ProgramaSchema);
    await queryInterface.createTable(TURNO_TABLE, TurnoSchema);
    await queryInterface.createTable(PROGRAMA_TURNO_TABLE, ProgramaTurnoSchema);
    await queryInterface.createTable(GRADO_TABLE, GradoSchema);
    await queryInterface.createTable(USUARIO_USUARIO_TABLE, UsuarioUsuarioSchema);
    await queryInterface.createTable(RECTOR_TABLE, RectorSchema);
    await queryInterface.createTable(DIRECTOR_TABLE, DirectorSchema);
    await queryInterface.createTable(TIPO_INSTALACION_TABLE, TipoInstalacionSchema);
    await queryInterface.createTable(DOCENTE_TABLE, DocenteSchema);
    await queryInterface.createTable(AREA_TABLE, AreaSchema);
    await queryInterface.createTable(ASIGNATURA_TABLE, AsignaturaSchema);
    await queryInterface.createTable(ASIGNATURA_DOCENTE_TABLE, AsignaturaDocenteSchema);
    await queryInterface.createTable(SECCION_TABLE, SeccionSchema);
    await queryInterface.createTable(SOLICITUD_SECCION_TABLE, SolicitudSeccionSchema);
    await queryInterface.createTable(HIGIENE_TABLE, HigieneSchema);
    await queryInterface.createTable(PLANTEL_HIGIENE_TABLE, PlantelHigieneSchema);
    await queryInterface.createTable(INFRAESTRUCTURA_TABLE, InfraestructuraSchema);
    await queryInterface.createTable(INFRAESTRUCTURA_PROGRAMA_TABLE, InfraestructuraProgramaSchema);
    await queryInterface.createTable(
      ASIGNATURA_INFRAESTRUCTURA_TABLE,
      AsignaturaInfraestructuraSchema,
    );
    await queryInterface.createTable(ESTATUS_INSPECCION_TABLE, EstatusInspeccionSchema);
    await queryInterface.createTable(INSPECCION_APARTADO_TABLE, InspeccionApartadoSchema);
    await queryInterface.createTable(INSPECCION_CATEGORIA_TABLE, InspeccionCategoriaSchema);
    await queryInterface.createTable(INSPECCION_TIPO_PREGUNTA_TABLE, InspeccionTipoPreguntaSchema);
    await queryInterface.createTable(INSPECCION_PREGUNTA_TABLE, InspeccionPreguntaSchema);
    await queryInterface.createTable(INSPECCION_TABLE, InspeccionSchema);
    await queryInterface.createTable(INSPECCION_OBSERVACION_TABLE, InspeccionObservacionSchema);
    await queryInterface.createTable(
      INSPECCION_INSPECCION_PREGUNTA_TABLE,
      InspeccionInspeccionPreguntaSchema,
    );
    await queryInterface.createTable(INSPECTOR_TABLE, InspectorSchema);
    await queryInterface.createTable(INSPECTOR_PROGRAMA_TABLE, InspectorProgramaSchema);
    await queryInterface.createTable(NOTIFICACION_TABLE, NotificacionSchema);
    await queryInterface.createTable(TRAYECTORIA_TABLE, TrayectoriaSchema);
    await queryInterface.createTable(SITUACION_TABLE, SituacionSchema);
    await queryInterface.createTable(TIPO_TRAMITE_TABLE, TipoTramiteSchema);
    await queryInterface.createTable(ALUMNO_TABLE, AlumnoSchema);
    await queryInterface.createTable(ALUMNO_TIPO_TRAMITE_TABLE, AlumnoTipoTramiteSchema);
    await queryInterface.createTable(EDIFICIO_NIVEL_TABLE, EdificioNivelSchema);
    await queryInterface.createTable(PLANTEL_EDIFICIO_NIVEL_TABLE, PlantelEdificioNivelSchema);
    await queryInterface.createTable(SALUD_INSTITUCION_TABLE, SaludInstitucionSchema);
    await queryInterface.createTable(SEGURIDAD_SISTEMA_TABLE, SeguridadSistemaSchema);
    await queryInterface.createTable(
      PLANTEL_SEGURIDAD_SISTEMA_TABLE,
      PlantelSeguridadSistemaSchema,
    );
    await queryInterface.createTable(EVALUADOR_TABLE, EvaluadorSchema);
    await queryInterface.createTable(CUMPLIMIENTO_TABLE, CumplimientoSchema);
    await queryInterface.createTable(EVALUACION_TABLE, EvaluacionSchema);
    await queryInterface.createTable(CICLO_ESCOLAR_TABLE, CicloEscolarSchema);
    await queryInterface.createTable(GRUPO_TABLE, GrupoSchema);
    await queryInterface.createTable(FORMACION_TABLE, FormacionSchema);
    await queryInterface.createTable(FORMACION_RECTOR_TABLE, FormacionRectorSchema);
    await queryInterface.createTable(FORMACION_DIRECTOR_TABLE, FormacionDirectorSchema);
    await queryInterface.createTable(FORMACION_DOCENTE_TABLE, FormacionDocenteSchema);
    await queryInterface.createTable(ALUMNO_GRUPO_TABLE, AlumnoGrupoSchema);
    await queryInterface.createTable(CALIFICACION_TABLE, CalificacionSchema);
    await queryInterface.createTable(SITUACION_VALIDACION_TABLE, SituacionValidacionSchema);
    await queryInterface.createTable(TIPO_VALIDACION_TABLE, TipoValidacionSchema);
    await queryInterface.createTable(VALIDACION_TABLE, ValidacionSchema);
    await queryInterface.createTable(ESTATUS_VIGILANCIA_TABLE, EstatusVigilanciaSchema);
    await queryInterface.createTable(VIGILANCIA_APARTADO_TABLE, VigilanciaApartadoSchema);
    await queryInterface.createTable(VIGILANCIA_CATEGORIA_TABLE, VigilanciaCategoriaSchema);
    await queryInterface.createTable(VIGILANCIA_TIPO_PREGUNTA_TABLE, VigilanciaTipoPreguntaSchema);
    await queryInterface.createTable(VIGILANCIA_PREGUNTA_TABLE, VigilanciaPreguntaSchema);
    await queryInterface.createTable(VIGILANCIA_TABLE, VigilanciaSchema);
    await queryInterface.createTable(VIGILANCIA_OBSERVACION_TABLE, VigilanciaObservacionSchema);
    await queryInterface.createTable(
      VIGILANCIA_VIGILANCIA_PREGUNTA_TABLE,
      VigilanciaVigilanciaPreguntaSchema,
    );
    await queryInterface.createTable(VIGILANTE_TABLE, VigilanteSchema);
    await queryInterface.createTable(VIGILANTE_VIGILANCIA_TABLE, VigilanteVigilanciaSchema);
    await queryInterface.createTable(SESION_TABLE, SesionSchema);
    await queryInterface.createTable(PERIODO_TABLE, PeriodoSchema);
    await queryInterface.createTable(ORGANO_COLEGIADO_TABLE, OrganoColegiadoSchema);
    await queryInterface.createTable(ACUERDO_TABLE, AcuerdoSchema);
    await queryInterface.createTable(PLAN_MAESTRO_TABLE, PlanMaestroSchema);
    await queryInterface.createTable(TIPO_PROYECTO_TABLE, TipoProyectoSchema);
    await queryInterface.createTable(CONTRATO_TABLE, ContratoSchema);
    await queryInterface.createTable(RESPONSABLE_OBRA_TABLE, ResponsableObraSchema);
    await queryInterface.createTable(RESPONSABLE_PLANEACION_TABLE, ResponsablePlaneacionSchema);
    await queryInterface.createTable(PROYECTO_TABLE, ProyectoSchema);
    await queryInterface.createTable(PROYECTO_TIPO_PROYECTO_TABLE, ProyectoTipoProyectoSchema);
    await queryInterface.createTable(PROYECTO_ESPACIO_TABLE, ProyectoEspacioSchema);
    await queryInterface.createTable(TIPO_EGRESO_TABLE, TipoEgresoSchema);
    await queryInterface.createTable(TIPO_PRESUPUESTO_TABLE, TipoPresupuestoSchema);
    await queryInterface.createTable(TIPO_RECURSO_PRESUPUESTO_TABLE, TipoRecursoPresupuestoSchema);
    await queryInterface.createTable(PRESUPUESTO_EGRESO_TABLE, PresupuestoEgresoSchema);
    await queryInterface.createTable(PRESUPUESTO_TABLE, PresupuestoSchema);
    await queryInterface.createTable(
      FUNDAMENTO_SERVICIO_SOCIAL_TABLE,
      FundamentoServicioSocialSchema,
    );
    await queryInterface.createTable(TIPO_MODALIDAD_TABLE, TipoModalidadSchema);
    await queryInterface.createTable(MODALIDAD_TITULACION_TABLE, ModalidadTitulacionSchema);
    await queryInterface.createTable(TIPO_SOLICITUD_FOLIO_TABLE, TipoSolicitudFolioSchema);
    await queryInterface.createTable(TIPO_DOCUMENTO_TABLE, TipoDocumentoSchema);
    await queryInterface.createTable(ESTATUS_SOLICITUD_FOLIO_TABLE, EstatusSolicitudFolioSchema);
    await queryInterface.createTable(SOLICITUD_FOLIO_TABLE, SolicitudFolioSchema);
    await queryInterface.createTable(SOLICITUD_FOLIO_ALUMNO_TABLE, SolicitudFolioAlumnoSchema);
    await queryInterface.createTable(LIBRO_TABLE, LibroSchema);
    await queryInterface.createTable(FOJA_TABLE, FojaSchema);
    await queryInterface.createTable(FOLIO_DOCUMENTO_ALUMNO_TABLE, FolioDocumentoAlumnoSchema);
    await queryInterface.createTable(INSTITUCION_DESTINO_TABLE, InstitucionDestinoSchema);
    await queryInterface
      .createTable(INSTITUCION_DESTINO_PROGRAMA_TABLE, InstitucionDestinoProgramaSchema);
    await queryInterface.createTable(INSTITUCION_PROCEDENCIA_TABLE, InstitucionProcedenciaSchema);
    await queryInterface.createTable(INTERESADO_TABLE, InteresadoSchema);
    await queryInterface
      .createTable(ESTATUS_SOLICITUD_REV_EQUIV_TABLE, EstatusSolicitudRevEquivSchema);
    await queryInterface.createTable(SOLICITUD_REV_EQUIV_TABLE, SolicitudRevEquivSchema);
    await queryInterface.createTable(
      ASIGNATURA_ANTECEDENTE_EQUIVALENTE_TABLE,
      AsignaturaAntecedenteEquivalenteSchema,
    );
    await queryInterface.createTable(
      ASIGNATURA_EQUIVALENTE_PROGRAMA_TABLE,
      AsignaturaEquivalenteProgramaSchema,
    );
    await queryInterface.createTable(ESTATUS_ALUMNO_BECA_TABLE, EstatusAlumnoBecaSchema);
    await queryInterface.createTable(TIPO_ALUMNO_BECA_TABLE, TipoAlumnoBecaSchema);
    await queryInterface.createTable(ESTATUS_SOLICITUD_BECA_TABLE, EstatusSolicitudBecaSchema);
    await queryInterface.createTable(SOLICITUD_BECA_TABLE, SolicitudBecaSchema);
    await queryInterface.createTable(SOLICITUD_BECA_ALUMNO_TABLE, SolicitudBecaAlumnoSchema);
    await queryInterface.createTable(
      MODALIDAD_SERVICIO_SOCIAL_TABLE,
      ModalidadServicioSocialSchema,
    );
    await queryInterface.createTable(
      SECTOR_SERVICIO_SOCIAL_TABLE,
      SectorServicioSocialSchema,
    );
    await queryInterface.createTable(
      DIMENSION_SERVICIO_SOCIAL_TABLE,
      DimensionServicioSocialSchema,
    );
    await queryInterface.createTable(
      ESTATUS_SOLICITUD_SERVICIO_SOCIAL_TABLE,
      EstatusSolicitudServicioSocialSchema,
    );
    await queryInterface.createTable(
      EJE_SERVICIO_SOCIAL_TABLE,
      EjeServicioSocialSchema,
    );
    await queryInterface.createTable(
      SOLICITUD_SERVICIO_SOCIAL_TABLE,
      SolicitudServicioSocialSchema,
    );
    await queryInterface.createTable(
      SOLICITUD_SERVICIO_SOCIAL_ALUMNO_TABLE,
      SolicitudServicioSocialAlumnoSchema,
    );
    await queryInterface.createTable(
      TOKEN_RECOVERY_PASSWORD_TABLE,
      TokenRecoveryPasswordSchema,
    );

    // SIIGES 1.0
    await queryInterface.createTable(ACADEMIA_TABLE, AcademiaSchema);
    await queryInterface.createTable(PROGRAMA_EVALUACION_TABLE, ProgramaEvaluacionSchema);
    await queryInterface.createTable(EVALUACION_APARTADO_TABLE, EvaluacionApartadoSchema);
    await queryInterface.createTable(MIXTA_NOESCOLARIZADA_TABLE, MixtaNoescolarizadaSchema);
    await queryInterface.createTable(ALUMNO_OBSERVACION_TABLE, AlumnoObservacionSchema);
    await queryInterface.createTable(HEMEROBIBLIOGRAFICA_TABLE, HemerobibliograficaSchema);
    await queryInterface.createTable(
      ASIGNATURA_HEMEROBIBLIOGRAFICA_TABLE,
      AsignaturaHemerobibliograficaSchema,
    );
    await queryInterface.createTable(ASOCIACION_TABLE, AsociacionSchema);
    await queryInterface.createTable(BITACORA_TABLE, BitacoraSchema);
    await queryInterface.createTable(
      CATEGORIA_EVALUACION_PREGUNTA_TABLE,
      CategoriaEvaluacionPreguntaSchema,
    );
    await queryInterface.createTable(DICTAMEN_TABLE, DictamenSchema);
    await queryInterface.createTable(DOCUMENTO_TABLE, DocumentoSchema);
    await queryInterface.createTable(EQUIVALENCIA_TABLE, EquivalenciaSchema);
    await queryInterface.createTable(ESCALA_TABLE, EscalaSchema);
    await queryInterface.createTable(ESPEJO_TABLE, EspejoSchema);
    await queryInterface.createTable(ESTATUS_CALIFICACION_TABLE, EstatusCalificacionSchema);
    await queryInterface.createTable(EVALUACION_PREGUNTA_TABLE, EvaluacionPreguntaSchema);
    await queryInterface.createTable(EVALUACION_PROCESO_TABLE, EvaluacionProcesoSchema);
    await queryInterface.createTable(
      EVALUACIONES_EVALUACION_PREGUNTA_TABLE,
      EvaluacionesEvaluacionPreguntaSchema,
    );
    await queryInterface.createTable(EVALUADOR_MODALIDAD_TABLE, EvaluadorModalidadSchema);
    await queryInterface.createTable(EXPERIENCIA_TABLE, ExperienciaSchema);
    await queryInterface.createTable(INSTITUCIONAL_TABLE, InstitucionalSchema);
    await queryInterface.createTable(MODULO_TABLE, ModuloSchema);
    await queryInterface.createTable(MODULO_ROL_TABLE, ModuloRolSchema);
    await queryInterface.createTable(NOTICIA_TABLE, NoticiaSchema);
    await queryInterface.createTable(OFICIO_TABLE, OficioSchema);
    await queryInterface.createTable(OFICIO_DETALLE_TABLE, OficioDetalleSchema);
    await queryInterface.createTable(PAGO_TABLE, PagoSchema);
    await queryInterface.createTable(PERFIL_TABLE, PerfilSchema);
    await queryInterface.createTable(PLANTEL_DICTAMEN_TABLE, PlantelDictamenSchema);
    await queryInterface.createTable(RESPALDO_TABLE, RespaldoSchema);
    await queryInterface.createTable(
      SOLICITUD_ESTADO_SOLICITUD_TABLE,
      SolicitudEstatusSolicitudSchema,
    );
    await queryInterface.createTable(SOLICITUD_USUARIO_TABLE, SolicitudUsuarioSchema);
    await queryInterface.createTable(TESTIGO_TABLE, TestigoSchema);
    await queryInterface.createTable(
      AUTORIZACION_RECONOCIMIENTO_TABLE,
      AutorizacionReconocimientoSchema,
    );
    await queryInterface.createTable(CARGO_TABLE, CargoSchema);
    await queryInterface.createTable(TITULO_ELECTRONICO_TABLE, TituloElectronicoSchema);
    await queryInterface.createTable(
      ALUMNO_TITULO_ELECTRONICO_TABLE,
      AlumnoTituloElectronicoSchema,
    );
  },

  async down(queryInterface) {
    // SIIGES 2.0
    await queryInterface.dropTable(ROL_TABLE);
    await queryInterface.dropTable(PAIS_TABLE);
    await queryInterface.dropTable(ESTADO_TABLE);
    await queryInterface.dropTable(MUNICIPIO_TABLE);
    await queryInterface.dropTable(DOMICILIO_TABLE);
    await queryInterface.dropTable(PERSONA_TABLE);
    await queryInterface.dropTable(USUARIO_TABLE);
    await queryInterface.dropTable(REPRESENTANTE_TABLE);
    await queryInterface.dropTable(FILE_TABLE);
    await queryInterface.dropTable(TIPO_INSTITUCION_TABLE);
    await queryInterface.dropTable(INSTITUCION_TABLE);
    await queryInterface.dropTable(TIPO_INMUEBLE_TABLE);
    await queryInterface.dropTable(PLANTEL_TABLE);
    await queryInterface.dropTable(RATIFICACION_NOMBRE_TABLE);
    await queryInterface.dropTable(ESTATUS_SOLICITUD_TABLE);
    await queryInterface.dropTable(TIPO_SOLICITUD_TABLE);
    await queryInterface.dropTable(SOLICITUD_TABLE);
    await queryInterface.dropTable(REPRESENTANTE_TABLE);
    await queryInterface.dropTable(DILIGENCIA_TABLE);
    await queryInterface.dropTable(CICLO_TABLE);
    await queryInterface.dropTable(MODALIDAD_TABLE);
    await queryInterface.dropTable(NIVEL_TABLE);
    await queryInterface.dropTable(PROGRAMA_TABLE);
    await queryInterface.dropTable(TURNO_TABLE);
    await queryInterface.dropTable(PROGRAMA_TURNO_TABLE);
    await queryInterface.dropTable(USUARIO_USUARIO_TABLE);
    await queryInterface.dropTable(RECTOR_TABLE);
    await queryInterface.dropTable(DIRECTOR_TABLE);
    await queryInterface.dropTable(TIPO_INSTALACION_TABLE);
    await queryInterface.dropTable(DOCENTE_TABLE);
    await queryInterface.dropTable(AREA_TABLE);
    await queryInterface.dropTable(ASIGNATURA_TABLE);
    await queryInterface.dropTable(ASIGNATURA_DOCENTE_TABLE);
    await queryInterface.dropTable(SECCION_TABLE);
    await queryInterface.dropTable(SOLICITUD_SECCION_TABLE);
    await queryInterface.dropTable(HIGIENE_TABLE);
    await queryInterface.dropTable(PLANTEL_HIGIENE_TABLE);
    await queryInterface.dropTable(INFRAESTRUCTURA_TABLE);
    await queryInterface.dropTable(INFRAESTRUCTURA_PROGRAMA_TABLE);
    await queryInterface.dropTable(ASIGNATURA_INFRAESTRUCTURA_TABLE);
    await queryInterface.dropTable(ESTATUS_INSPECCION_TABLE);
    await queryInterface.dropTable(INSPECCION_APARTADO_TABLE);
    await queryInterface.dropTable(INSPECCION_CATEGORIA_TABLE);
    await queryInterface.dropTable(INSPECCION_TIPO_PREGUNTA_TABLE);
    await queryInterface.dropTable(INSPECCION_PREGUNTA_TABLE);
    await queryInterface.dropTable(INSPECCION_TABLE);
    await queryInterface.dropTable(INSPECCION_OBSERVACION_TABLE);
    await queryInterface.dropTable(INSPECCION_INSPECCION_PREGUNTA_TABLE);
    await queryInterface.dropTable(INSPECTOR_TABLE);
    await queryInterface.dropTable(INSPECTOR_PROGRAMA_TABLE);
    await queryInterface.dropTable(NOTIFICACION_TABLE);
    await queryInterface.dropTable(TRAYECTORIA_TABLE);
    await queryInterface.dropTable(SITUACION_TABLE);
    await queryInterface.dropTable(TIPO_TRAMITE_TABLE);
    await queryInterface.dropTable(ALUMNO_TABLE);
    await queryInterface.dropTable(ALUMNO_TIPO_TRAMITE_TABLE);
    await queryInterface.dropTable(EDIFICIO_NIVEL_TABLE);
    await queryInterface.dropTable(PLANTEL_EDIFICIO_NIVEL_TABLE);
    await queryInterface.dropTable(SALUD_INSTITUCION_TABLE);
    await queryInterface.dropTable(SEGURIDAD_SISTEMA_TABLE);
    await queryInterface.dropTable(PLANTEL_SEGURIDAD_SISTEMA_TABLE);
    await queryInterface.dropTable(EVALUADOR_TABLE);
    await queryInterface.dropTable(CUMPLIMIENTO_TABLE);
    await queryInterface.dropTable(EVALUACION_TABLE);
    await queryInterface.dropTable(GRADO_TABLE);
    await queryInterface.dropTable(CICLO_ESCOLAR_TABLE);
    await queryInterface.dropTable(GRUPO_TABLE);
    await queryInterface.dropTable(FORMACION_TABLE);
    await queryInterface.dropTable(FORMACION_RECTOR_TABLE);
    await queryInterface.dropTable(FORMACION_DIRECTOR_TABLE);
    await queryInterface.dropTable(FORMACION_DOCENTE_TABLE);
    await queryInterface.dropTable(ALUMNO_GRUPO_TABLE);
    await queryInterface.dropTable(CALIFICACION_TABLE);
    await queryInterface.dropTable(SITUACION_VALIDACION_TABLE);
    await queryInterface.dropTable(TIPO_VALIDACION_TABLE);
    await queryInterface.dropTable(VALIDACION_TABLE);
    await queryInterface.dropTable(ESTATUS_VIGILANCIA_TABLE);
    await queryInterface.dropTable(VIGILANCIA_APARTADO_TABLE);
    await queryInterface.dropTable(VIGILANCIA_CATEGORIA_TABLE);
    await queryInterface.dropTable(VIGILANCIA_TIPO_PREGUNTA_TABLE);
    await queryInterface.dropTable(VIGILANCIA_PREGUNTA_TABLE);
    await queryInterface.dropTable(VIGILANCIA_TABLE);
    await queryInterface.dropTable(VIGILANCIA_OBSERVACION_TABLE);
    await queryInterface.dropTable(VIGILANCIA_VIGILANCIA_PREGUNTA_TABLE);
    await queryInterface.dropTable(VIGILANTE_TABLE);
    await queryInterface.dropTable(VIGILANTE_VIGILANCIA_TABLE);
    await queryInterface.dropTable(SESION_TABLE);
    await queryInterface.dropTable(PERIODO_TABLE);
    await queryInterface.dropTable(ORGANO_COLEGIADO_TABLE);
    await queryInterface.dropTable(ACUERDO_TABLE);
    await queryInterface.dropTable(PLAN_MAESTRO_TABLE);
    await queryInterface.dropTable(PROYECTO_TABLE);
    await queryInterface.dropTable(TIPO_PROYECTO_TABLE);
    await queryInterface.dropTable(PROYECTO_TIPO_PROYECTO_TABLE);
    await queryInterface.dropTable(CONTRATO_TABLE);
    await queryInterface.dropTable(RESPONSABLE_OBRA_TABLE);
    await queryInterface.dropTable(RESPONSABLE_PLANEACION_TABLE);
    await queryInterface.dropTable(PROYECTO_ESPACIO_TABLE);
    await queryInterface.dropTable(PRESUPUESTO_EGRESO_TABLE);
    await queryInterface.dropTable(PRESUPUESTO_TABLE);
    await queryInterface.dropTable(TIPO_PRESUPUESTO_TABLE);
    await queryInterface.dropTable(TIPO_RECURSO_PRESUPUESTO_TABLE);
    await queryInterface.dropTable(TIPO_EGRESO_TABLE);
    await queryInterface.dropTable(FUNDAMENTO_SERVICIO_SOCIAL_TABLE);
    await queryInterface.dropTable(TIPO_MODALIDAD_TABLE);
    await queryInterface.dropTable(MODALIDAD_TITULACION_TABLE);
    await queryInterface.dropTable(TIPO_SOLICITUD_FOLIO_TABLE);
    await queryInterface.dropTable(TIPO_DOCUMENTO_TABLE);
    await queryInterface.dropTable(ESTATUS_SOLICITUD_FOLIO_TABLE);
    await queryInterface.dropTable(SOLICITUD_FOLIO_TABLE);
    await queryInterface.dropTable(SOLICITUD_FOLIO_ALUMNO_TABLE);
    await queryInterface.dropTable(LIBRO_TABLE);
    await queryInterface.dropTable(FOJA_TABLE);
    await queryInterface.dropTable(FOLIO_DOCUMENTO_ALUMNO_TABLE);
    await queryInterface.dropTable(INSTITUCION_DESTINO_TABLE);
    await queryInterface.dropTable(INSTITUCION_DESTINO_PROGRAMA_TABLE);
    await queryInterface.dropTable(INSTITUCION_PROCEDENCIA_TABLE);
    await queryInterface.dropTable(INTERESADO_TABLE);
    await queryInterface.dropTable(ESTATUS_SOLICITUD_REV_EQUIV_TABLE);
    await queryInterface.dropTable(SOLICITUD_REV_EQUIV_TABLE);
    await queryInterface.dropTable(ASIGNATURA_ANTECEDENTE_EQUIVALENTE_TABLE);
    await queryInterface.dropTable(ASIGNATURA_EQUIVALENTE_PROGRAMA_TABLE);
    await queryInterface.dropTable(SOLICITUD_BECA_TABLE);
    await queryInterface.dropTable(SOLICITUD_BECA_ALUMNO_TABLE);
    await queryInterface.dropTable(ESTATUS_ALUMNO_BECA_TABLE);
    await queryInterface.dropTable(TIPO_ALUMNO_BECA_TABLE);
    await queryInterface.dropTable(ESTATUS_SOLICITUD_BECA_TABLE);
    await queryInterface.dropTable(MODALIDAD_SERVICIO_SOCIAL_TABLE);
    await queryInterface.dropTable(SECTOR_SERVICIO_SOCIAL_TABLE);
    await queryInterface.dropTable(DIMENSION_SERVICIO_SOCIAL_TABLE);
    await queryInterface.dropTable(ESTATUS_SOLICITUD_SERVICIO_SOCIAL_TABLE);
    await queryInterface.dropTable(EJE_SERVICIO_SOCIAL_TABLE);
    await queryInterface.dropTable(SOLICITUD_SERVICIO_SOCIAL_TABLE);
    await queryInterface.dropTable(SOLICITUD_SERVICIO_SOCIAL_ALUMNO_TABLE);
    await queryInterface.dropTable(TOKEN_RECOVERY_PASSWORD_TABLE);

    // SIIGES 1.0
    await queryInterface.dropTable(ACADEMIA_TABLE);
    await queryInterface.dropTable(PROGRAMA_EVALUACION_TABLE);
    await queryInterface.dropTable(EVALUACION_APARTADO_TABLE);
    await queryInterface.dropTable(MIXTA_NOESCOLARIZADA_TABLE);
    await queryInterface.dropTable(ALUMNO_OBSERVACION_TABLE);
    await queryInterface.dropTable(HEMEROBIBLIOGRAFICA_TABLE);
    await queryInterface.dropTable(ASIGNATURA_HEMEROBIBLIOGRAFICA_TABLE);
    await queryInterface.dropTable(ASOCIACION_TABLE);
    await queryInterface.dropTable(BITACORA_TABLE);
    await queryInterface.dropTable(CATEGORIA_EVALUACION_PREGUNTA_TABLE);
    await queryInterface.dropTable(DICTAMEN_TABLE);
    await queryInterface.dropTable(DOCUMENTO_TABLE);
    await queryInterface.dropTable(EQUIVALENCIA_TABLE);
    await queryInterface.dropTable(ESCALA_TABLE);
    await queryInterface.dropTable(ESPEJO_TABLE);
    await queryInterface.dropTable(ESTATUS_CALIFICACION_TABLE);
    await queryInterface.dropTable(EVALUACION_PREGUNTA_TABLE);
    await queryInterface.dropTable(EVALUACION_PROCESO_TABLE);
    await queryInterface.dropTable(EVALUACIONES_EVALUACION_PREGUNTA_TABLE);
    await queryInterface.dropTable(EVALUADOR_MODALIDAD_TABLE);
    await queryInterface.dropTable(EXPERIENCIA_TABLE);
    await queryInterface.dropTable(INSTITUCIONAL_TABLE);
    await queryInterface.dropTable(MODULO_TABLE);
    await queryInterface.dropTable(MODULO_ROL_TABLE);
    await queryInterface.dropTable(NOTICIA_TABLE);
    await queryInterface.dropTable(OFICIO_TABLE);
    await queryInterface.dropTable(OFICIO_DETALLE_TABLE);
    await queryInterface.dropTable(PAGO_TABLE);
    await queryInterface.dropTable(PERFIL_TABLE);
    await queryInterface.dropTable(PLANTEL_DICTAMEN_TABLE);
    await queryInterface.dropTable(RESPALDO_TABLE);
    await queryInterface.dropTable(SOLICITUD_ESTADO_SOLICITUD_TABLE);
    await queryInterface.dropTable(SOLICITUD_USUARIO_TABLE);
    await queryInterface.dropTable(TESTIGO_TABLE);
    await queryInterface.dropTable(AUTORIZACION_RECONOCIMIENTO_TABLE);
    await queryInterface.dropTable(CARGO_TABLE);
    await queryInterface.dropTable(TITULO_ELECTRONICO_TABLE);
    await queryInterface.dropTable(ALUMNO_TITULO_ELECTRONICO_TABLE);
  },
};
