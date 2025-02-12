const { Ciclo, CicloSchema } = require('./ciclo');
const { Domicilio, DomicilioSchema } = require('./domicilio');
const { Diligencia, DiligenciaSchema } = require('./diligencia');
const { Estado, EstadoSchema } = require('./estado');
const { EstatusSolicitud, EstatusSolicitudSchema } = require('./estatusSolicitud');
const { File, FileSchema } = require('./file');
const { TipoInstitucion, TipoInstitucionSchema } = require('./tipoInstitucion');
const { Institucion, InstitucionSchema } = require('./institucion');
const { Modalidad, ModalidadSchema } = require('./modalidad');
const { Municipio, MunicipioSchema } = require('./municipio');
const { Nivel, NivelSchema } = require('./nivel');
const { Pais, PaisSchema } = require('./pais');
const { Persona, PersonaSchema } = require('./persona');
const { Plantel, PlantelSchema } = require('./plantel');
const { Programa, ProgramaSchema } = require('./programa');
const { Turno, TurnoSchema } = require('./turno');
const { ProgramaTurno, ProgramaTurnoSchema } = require('./programaTurno');
const { RatificacionNombre, RatificacionNombreSchema } = require('./ratificacionNombre');
const { Representante, RepresentanteSchema } = require('./representante');
const { Rol, RolSchema } = require('./rol');
const { Solicitud, SolicitudSchema } = require('./solicitud');
const { TipoInmueble, TipoInmuebleSchema } = require('./tipoInmueble');
const { TipoSolicitud, TipoSolicitudSchema } = require('./tipoSolicitud');
const { Usuario, UsuarioSchema } = require('./usuario');
const { UsuarioUsuario, UsuarioUsuarioSchema } = require('./usuarioUsuario');
const { Rector, RectorSchema } = require('./rector');
const { Director, DirectorSchema } = require('./director');
const { TipoInstalacion, TipoInstalacionSchema } = require('./tipoInstalacion');
const { Docente, DocenteSchema } = require('./docente');
const { Area, AreaSchema } = require('./area');
const { Asignatura, AsignaturaSchema } = require('./asignatura');
const { AsignaturaDocente, AsignaturaDocenteSchema } = require('./asignaturaDocente');
const { Seccion, SeccionSchema } = require('./seccion');
const { SolicitudSeccion, SolicitudSeccionSchema } = require('./solicitudSeccion');
const { Higiene, HigieneSchema } = require('./higiene');
const { PlantelHigiene, PlantelHigieneSchema } = require('./plantelHigiene');
const { Infraestructura, InfraestructuraSchema } = require('./infraestructura');
const { InfraestructuraPrograma, InfraestructuraProgramaSchema } = require('./infraestructuraPrograma');
const { AsignaturaInfraestructura, AsignaturaInfraestructuraSchema } = require('./asignaturaInfraestructura');
const { EstatusInspeccion, EstatusInspeccionSchema } = require('./estatusInspeccion');
const { InspeccionApartado, InspeccionApartadoSchema } = require('./inspeccionApartado');
const { InspeccionCategoria, InspeccionCategoriaSchema } = require('./inspeccionCategoria');
const { InspeccionTipoPregunta, InspeccionTipoPreguntaSchema } = require('./inspeccionTipoPregunta');
const { InspeccionObservacion, InspeccionObservacionSchema } = require('./inspeccionObservacion');
const { InspeccionPregunta, InspeccionPreguntaSchema } = require('./inspeccionPregunta');
const { Inspeccion, InspeccionSchema } = require('./inspeccion');
const { InspeccionInspeccionPregunta, InspeccionInspeccionPreguntaSchema } = require('./inspeccionInspeccionPregunta');
const { Inspector, InspectorSchema } = require('./inspector');
const { InspectorPrograma, InspectorProgramaSchema } = require('./inspectorPrograma');
const { Notificacion, NotificacionSchema } = require('./notificacion');
const { Trayectoria, TrayectoriaSchema } = require('./trayectoria');
const { Situacion, SituacionSchema } = require('./situacion');
const { TipoTramite, TipoTramiteSchema } = require('./tipoTramite');
const { Alumno, AlumnoSchema } = require('./alumno');
const { AlumnoTipoTramite, AlumnoTipoTramiteSchema } = require('./alumnoTipoTramite');
const { EdificioNivel, EdificioNivelSchema } = require('./edificioNivel');
const { PlantelEdificioNivel, PlantelEdificioNivelSchema } = require('./plantelEdificioNivel');
const { SaludInstitucion, SaludInstitucionSchema } = require('./saludInstitucion');
const { SeguridadSistema, SeguridadSistemaSchema } = require('./seguridadSistema');
const { PlantelSeguridadSistema, PlantelSeguridadSistemaSchema } = require('./plantelSeguridadSistema');
const { Cumplimiento, CumplimientoSchema } = require('./cumplimiento');
const { Evaluacion, EvaluacionSchema } = require('./evaluacion');
const { Evaluador, EvaluadorSchema } = require('./evaluador');
const { Grado, GradoSchema } = require('./grado');
const { CicloEscolar, CicloEscolarSchema } = require('./cicloEscolar');
const { Grupo, GrupoSchema } = require('./grupo');
const { Formacion, FormacionSchema } = require('./formacion');
const { FormacionRector, FormacionRectorSchema } = require('./formacionRector');
const { FormacionDirector, FormacionDirectorSchema } = require('./formacionesDirectores');
const { FormacionDocente, FormacionDocenteSchema } = require('./formacionesDocentes');
const { AlumnoGrupo, AlumnoGrupoSchema } = require('./alumnoGrupo');
const { Calificacion, CalificacionSchema } = require('./calificacion');
const { SituacionValidacion, SituacionValidacionSchema } = require('./situacionValidacion');
const { TipoValidacion, TipoValidacionSchema } = require('./tipoValidacion');
const { Validacion, ValidacionSchema } = require('./validacion');
const { EstatusVigilancia, EstatusVigilanciaSchema } = require('./estatusVigilancia');
const { VigilanciaApartado, VigilanciaApartadoSchema } = require('./vigilanciaApartado');
const { VigilanciaCategoria, VigilanciaCategoriaSchema } = require('./vigilanciaCategoria');
const { VigilanciaTipoPregunta, VigilanciaTipoPreguntaSchema } = require('./vigilanciaTipoPregunta');
const { VigilanciaObservacion, VigilanciaObservacionSchema } = require('./vigilanciaObservacion');
const { VigilanciaPregunta, VigilanciaPreguntaSchema } = require('./vigilanciaPregunta');
const { Vigilancia, VigilanciaSchema } = require('./vigilancia');
const { VigilanciaVigilanciaPregunta, VigilanciaVigilanciaPreguntaSchema } = require('./vigilanciaVigilanciaPregunta');
const { Vigilante, VigilanteSchema } = require('./vigilante');
const { VigilanteVigilancia, VigilanteVigilanciaSchema } = require('./vigilanteVigilancia');
const { Sesion, SesionSchema } = require('./sesion');
const { Periodo, PeriodoSchema } = require('./periodo');
const { OrganoColegiado, OrganoColegiadoSchema } = require('./organoColegiado');
const { Acuerdo, AcuerdoSchema } = require('./acuerdo');
const { PlanMaestro, PlanMaestroSchema } = require('./planMaestro');
const { Proyecto, ProyectoSchema } = require('./proyecto');
const { TipoProyecto, TipoProyectoSchema } = require('./tipoProyecto');
const { ProyectoTipoProyecto, ProyectoTipoProyectoSchema } = require('./proyectoTipoProyecto');
const { Contrato, ContratoSchema } = require('./contrato');
const { ResponsableObra, ResponsableObraSchema } = require('./responsableObra');
const { ResponsablePlaneacion, ResponsablePlaneacionSchema } = require('./responsablePlaneacion');
const { ProyectoEspacio, ProyectoEspacioSchema } = require('./proyectoEspacio');
const { PresupuestoEgreso, PresupuestoEgresoSchema } = require('./presupuestoEgreso');
const { Presupuesto, PresupuestoSchema } = require('./presupuesto');
const { TipoPresupuesto, TipoPresupuestoSchema } = require('./tipoPresupuesto');
const { TipoRecursoPresupuesto, TipoRecursoPresupuestoSchema } = require('./tipoRecursoPresupuesto');
const { TipoEgreso, TipoEgresoSchema } = require('./tipoEgreso');
const { TipoSolicitudFolio, TipoSolicitudFolioSchema } = require('./tipoSolicitudFolio');
const { TipoDocumento, TipoDocumentoSchema } = require('./tipoDocumento');
const { EstatusSolicitudFolio, EstatusSolicitudFolioSchema } = require('./estatusSolicitudFolio');
const { SolicitudFolio, SolicitudFolioSchema } = require('./solicitudFolio');
const { SolicitudFolioAlumno, SolicitudFolioAlumnoSchema } = require('./solicitudFolioAlumno');
const { Libro, LibroSchema } = require('./libro');
const { Foja, FojaSchema } = require('./foja');
const { FolioDocumentoAlumno, FolioDocumentoAlumnoSchema } = require('./folioDocumentoAlumno');
const { InstitucionDestino, InstitucionDestinoSchema } = require('./institucionDestino');
const { InstitucionDestinoPrograma, InstitucionDestinoProgramaSchema } = require('./institucionDestinoPrograma');
const { InstitucionProcedencia, InstitucionProcedenciaSchema } = require('./institucionProcedencia');
const { Interesado, InteresadoSchema } = require('./interesado');
const { EstatusSolicitudRevEquiv, EstatusSolicitudRevEquivSchema } = require('./estatusSolicitudRevEquiv');
const { SolicitudRevEquiv, SolicitudRevEquivSchema } = require('./solicitudRevEquiv');
const { AsignaturaAntecedenteEquivalente, AsignaturaAntecedenteEquivalenteSchema } = require('./asignaturaAntecedenteEquivalente');
const { AsignaturaEquivalentePrograma, AsignaturaEquivalenteProgramaSchema } = require('./asignaturaEquivalentePrograma');
const { FundamentoServicioSocial, FundamentoServicioSocialSchema } = require('./fundamentoServicioSocial');
const { TipoModalidad, TipoModalidadSchema } = require('./tipoModalidad');
const { ModalidadTitulacion, ModalidadTitulacionSchema } = require('./modalidadTitulacion');
// Siiges 1.0
const { Academia, AcademiaSchema } = require('./academias');
const { AlumnoObservacion, AlumnoObservacionSchema } = require('./alumnoObservaciones');
const { AsignaturaHemerobibliografica, AsignaturaHemerobibliograficaSchema } = require('./asignaturasHemerobibliograficas');
const { Asociacion, AsociacionSchema } = require('./asociaciones');
const { Bitacora, BitacoraSchema } = require('./bitacoras');
const { CategoriaEvaluacionPregunta, CategoriaEvaluacionPreguntaSchema } = require('./categoriasEvaluacionPregunta');
const { Dictamen, DictamenSchema } = require('./dictamenes');
const { Documento, DocumentoSchema } = require('./documentos');
const { Equivalencia, EquivalenciaSchema } = require('./equivalencias');
const { Escala, EscalaSchema } = require('./escalas');
const { Espejo, EspejoSchema } = require('./espejos');
const { EstatusCalificacion, EstatusCalificacionSchema } = require('./estatusCalificaciones');
const { EvaluacionApartado, EvaluacionApartadoSchema } = require('./evaluacionApartados');
const { EvaluacionPregunta, EvaluacionPreguntaSchema } = require('./evaluacionPreguntas');
const { EvaluacionProceso, EvaluacionProcesoSchema } = require('./evaluacionProcesos');
const { EvaluacionesEvaluacionPregunta, EvaluacionesEvaluacionPreguntaSchema } = require('./evaluacionesEvaluacionPreguntas');
const { EvaluadorModalidad, EvaluadorModalidadSchema } = require('./evaluadoresModalidades');
const { Experiencia, ExperienciaSchema } = require('./experiencias');
const { Hemerobibliografica, HemerobibliograficaSchema } = require('./hemerobibliograficas');
const { Institucional, InstitucionalSchema } = require('./institucionales');
const { MixtaNoescolarizada, MixtaNoescolarizadaSchema } = require('./mixtaNoEscolarizadas');
const { Modulo, ModuloSchema } = require('./modulos');
const { ModuloRol, ModuloRolSchema } = require('./modulosRoles');
const { Noticia, NoticiaSchema } = require('./noticias');
const { OficioDetalle, OficioDetalleSchema } = require('./oficioDetalles');
const { Oficio, OficioSchema } = require('./oficios');
const { Pago, PagoSchema } = require('./pagos');
const { Perfil, PerfilSchema } = require('./perfiles');
const { PlantelDictamen, PlantelDictamenSchema } = require('./plantelDictamenes');
const { ProgramaEvaluacion, ProgramaEvaluacionSchema } = require('./programaEvaluaciones');
const { Respaldo, RespaldoSchema } = require('./respaldos');
const { SolicitudEstatusSolicitud, SolicitudEstatusSolicitudSchema } = require('./solicitudesEstatusSolicitudes');
const { SolicitudUsuario, SolicitudUsuarioSchema } = require('./solicitudes_usuarios');
const { Testigo, TestigoSchema } = require('./testigos');
const { TituloElectronico, TituloElectronicoSchema } = require('./titulosElectronicos');
// Siiges 1.0 Fin

const { SolicitudBeca,SolicitudBecaSchema} = require('./solicitudesBecas')
const { SolicitudBecaAlumno, SolicitudBecaAlumnoSchema} = require('./solicitudesBecasAlumnos')
const { TipoSolicitudBeca, TipoSolicitudBecaSchema} = require('./tipoSolicitudesBecas')
const { EstatusAlumnoBeca, EstatusAlumnoBecaSchema} = require('./estatusAlumnosBecas')
const { EstatusSolicitudBeca,  EstatusSolicitudBecaSchema} = require('./estatusSolicitudesBecas')

function setupModels(sequelize) {
  // Initialize models
  Ciclo.init(CicloSchema, Ciclo.config(sequelize));
  Domicilio.init(DomicilioSchema, Domicilio.config(sequelize));
  Diligencia.init(DiligenciaSchema, Diligencia.config(sequelize));
  Estado.init(EstadoSchema, Estado.config(sequelize));
  EstatusSolicitud.init(EstatusSolicitudSchema, EstatusSolicitud.config(sequelize));
  File.init(FileSchema, File.config(sequelize));
  TipoInstitucion.init(TipoInstitucionSchema, TipoInstitucion.config(sequelize));
  Institucion.init(InstitucionSchema, Institucion.config(sequelize));
  Modalidad.init(ModalidadSchema, Modalidad.config(sequelize));
  Municipio.init(MunicipioSchema, Municipio.config(sequelize));
  Nivel.init(NivelSchema, Nivel.config(sequelize));
  Pais.init(PaisSchema, Pais.config(sequelize));
  Persona.init(PersonaSchema, Persona.config(sequelize));
  Plantel.init(PlantelSchema, Plantel.config(sequelize));
  Turno.init(TurnoSchema, Turno.config(sequelize));
  Programa.init(ProgramaSchema, Programa.config(sequelize));
  ProgramaTurno.init(ProgramaTurnoSchema, ProgramaTurno.config(sequelize));
  RatificacionNombre.init(RatificacionNombreSchema, RatificacionNombre.config(sequelize));
  Representante.init(RepresentanteSchema, Representante.config(sequelize));
  Rol.init(RolSchema, Rol.config(sequelize));
  Solicitud.init(SolicitudSchema, Solicitud.config(sequelize));
  TipoInmueble.init(TipoInmuebleSchema, TipoInmueble.config(sequelize));
  TipoSolicitud.init(TipoSolicitudSchema, TipoSolicitud.config(sequelize));
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  UsuarioUsuario.init(UsuarioUsuarioSchema, UsuarioUsuario.config(sequelize));
  Rector.init(RectorSchema, Rector.config(sequelize));
  Director.init(DirectorSchema, Director.config(sequelize));
  TipoInstalacion.init(TipoInstalacionSchema, TipoInstalacion.config(sequelize));
  Docente.init(DocenteSchema, Docente.config(sequelize));
  Area.init(AreaSchema, Area.config(sequelize));
  Asignatura.init(AsignaturaSchema, Asignatura.config(sequelize));
  AsignaturaDocente.init(AsignaturaDocenteSchema, AsignaturaDocente.config(sequelize));
  Seccion.init(SeccionSchema, Seccion.config(sequelize));
  SolicitudSeccion.init(SolicitudSeccionSchema, SolicitudSeccion.config(sequelize));
  Higiene.init(HigieneSchema, Higiene.config(sequelize));
  PlantelHigiene.init(PlantelHigieneSchema, PlantelHigiene.config(sequelize));
  Infraestructura.init(InfraestructuraSchema, Infraestructura.config(sequelize));
  InfraestructuraPrograma.init(
    InfraestructuraProgramaSchema,
    InfraestructuraPrograma.config(sequelize),
  );
  AsignaturaInfraestructura.init(
    AsignaturaInfraestructuraSchema,
    AsignaturaInfraestructura.config(sequelize),
  );
  EstatusInspeccion.init(EstatusInspeccionSchema, EstatusInspeccion.config(sequelize));
  InspeccionApartado.init(InspeccionApartadoSchema, InspeccionApartado.config(sequelize));
  InspeccionCategoria.init(InspeccionCategoriaSchema, InspeccionCategoria.config(sequelize));
  InspeccionTipoPregunta.init(
    InspeccionTipoPreguntaSchema,
    InspeccionTipoPregunta.config(sequelize),
  );
  InspeccionPregunta.init(InspeccionPreguntaSchema, InspeccionPregunta.config(sequelize));
  Inspeccion.init(InspeccionSchema, Inspeccion.config(sequelize));
  InspeccionObservacion.init(InspeccionObservacionSchema, InspeccionObservacion.config(sequelize));
  InspeccionInspeccionPregunta.init(
    InspeccionInspeccionPreguntaSchema,
    InspeccionInspeccionPregunta.config(sequelize),
  );
  Inspector.init(InspectorSchema, Inspector.config(sequelize));
  InspectorPrograma.init(InspectorProgramaSchema, InspectorPrograma.config(sequelize));
  Notificacion.init(NotificacionSchema, Notificacion.config(sequelize));
  Trayectoria.init(TrayectoriaSchema, Trayectoria.config(sequelize));
  Situacion.init(SituacionSchema, Situacion.config(sequelize));
  TipoTramite.init(TipoTramiteSchema, TipoTramite.config(sequelize));
  Alumno.init(AlumnoSchema, Alumno.config(sequelize));
  AlumnoTipoTramite.init(AlumnoTipoTramiteSchema, AlumnoTipoTramite.config(sequelize));
  EdificioNivel.init(EdificioNivelSchema, EdificioNivel.config(sequelize));
  PlantelEdificioNivel.init(PlantelEdificioNivelSchema, PlantelEdificioNivel.config(sequelize));
  SaludInstitucion.init(SaludInstitucionSchema, SaludInstitucion.config(sequelize));
  SeguridadSistema.init(SeguridadSistemaSchema, SeguridadSistema.config(sequelize));
  PlantelSeguridadSistema.init(
    PlantelSeguridadSistemaSchema,
    PlantelSeguridadSistema.config(sequelize),
  );
  Cumplimiento.init(CumplimientoSchema, Cumplimiento.config(sequelize));
  Evaluacion.init(EvaluacionSchema, Evaluacion.config(sequelize));
  Evaluador.init(EvaluadorSchema, Evaluador.config(sequelize));
  Grado.init(GradoSchema, Grado.config(sequelize));
  CicloEscolar.init(CicloEscolarSchema, CicloEscolar.config(sequelize));
  Grupo.init(GrupoSchema, Grupo.config(sequelize));
  Formacion.init(FormacionSchema, Formacion.config(sequelize));
  FormacionRector.init(FormacionRectorSchema, FormacionRector.config(sequelize));
  FormacionDirector.init(FormacionDirectorSchema, FormacionDirector.config(sequelize));
  FormacionDocente.init(FormacionDocenteSchema, FormacionDocente.config(sequelize));
  AlumnoGrupo.init(AlumnoGrupoSchema, AlumnoGrupo.config(sequelize));
  Calificacion.init(CalificacionSchema, Calificacion.config(sequelize));
  SituacionValidacion.init(
    SituacionValidacionSchema,
    SituacionValidacion.config(sequelize),
  );
  TipoValidacion.init(TipoValidacionSchema, TipoValidacion.config(sequelize));
  Validacion.init(ValidacionSchema, Validacion.config(sequelize));
  EstatusVigilancia.init(EstatusVigilanciaSchema, EstatusVigilancia.config(sequelize));
  VigilanciaApartado.init(VigilanciaApartadoSchema, VigilanciaApartado.config(sequelize));
  VigilanciaCategoria.init(VigilanciaCategoriaSchema, VigilanciaCategoria.config(sequelize));
  VigilanciaTipoPregunta.init(
    VigilanciaTipoPreguntaSchema,
    VigilanciaTipoPregunta.config(sequelize),
  );
  VigilanciaPregunta.init(VigilanciaPreguntaSchema, VigilanciaPregunta.config(sequelize));
  Vigilancia.init(VigilanciaSchema, Vigilancia.config(sequelize));
  VigilanciaObservacion.init(VigilanciaObservacionSchema, VigilanciaObservacion.config(sequelize));
  VigilanciaVigilanciaPregunta.init(
    VigilanciaVigilanciaPreguntaSchema,
    VigilanciaVigilanciaPregunta.config(sequelize),
  );
  Vigilante.init(VigilanteSchema, Vigilante.config(sequelize));
  VigilanteVigilancia.init(VigilanteVigilanciaSchema, VigilanteVigilancia.config(sequelize));
  Sesion.init(SesionSchema, Sesion.config(sequelize));
  Periodo.init(PeriodoSchema, Periodo.config(sequelize));
  OrganoColegiado.init(OrganoColegiadoSchema, OrganoColegiado.config(sequelize));
  Acuerdo.init(AcuerdoSchema, Acuerdo.config(sequelize));
  PlanMaestro.init(PlanMaestroSchema, PlanMaestro.config(sequelize));
  Proyecto.init(ProyectoSchema, Proyecto.config(sequelize));
  TipoProyecto.init(TipoProyectoSchema, TipoProyecto.config(sequelize));
  ProyectoTipoProyecto.init(ProyectoTipoProyectoSchema, ProyectoTipoProyecto.config(sequelize));
  Contrato.init(ContratoSchema, Contrato.config(sequelize));
  ResponsableObra.init(ResponsableObraSchema, ResponsableObra.config(sequelize));
  ResponsablePlaneacion.init(ResponsablePlaneacionSchema, ResponsablePlaneacion.config(sequelize));
  ProyectoEspacio.init(ProyectoEspacioSchema, ProyectoEspacio.config(sequelize));
  PresupuestoEgreso.init(PresupuestoEgresoSchema, PresupuestoEgreso.config(sequelize));
  Presupuesto.init(PresupuestoSchema, Presupuesto.config(sequelize));
  TipoPresupuesto.init(TipoPresupuestoSchema, TipoPresupuesto.config(sequelize));
  TipoRecursoPresupuesto.init(
    TipoRecursoPresupuestoSchema,
    TipoRecursoPresupuesto.config(sequelize),
  );
  TipoEgreso.init(TipoEgresoSchema, TipoEgreso.config(sequelize));
  TipoSolicitudFolio.init(TipoSolicitudFolioSchema, TipoSolicitudFolio.config(sequelize));
  TipoDocumento.init(TipoDocumentoSchema, TipoDocumento.config(sequelize));
  EstatusSolicitudFolio.init(EstatusSolicitudFolioSchema, EstatusSolicitudFolio.config(sequelize));
  SolicitudFolio.init(SolicitudFolioSchema, SolicitudFolio.config(sequelize));
  SolicitudFolioAlumno.init(SolicitudFolioAlumnoSchema, SolicitudFolioAlumno.config(sequelize));
  Libro.init(LibroSchema, Libro.config(sequelize));
  Foja.init(FojaSchema, Foja.config(sequelize));
  FolioDocumentoAlumno.init(FolioDocumentoAlumnoSchema, FolioDocumentoAlumno.config(sequelize));
  InstitucionDestino.init(InstitucionDestinoSchema, InstitucionDestino.config(sequelize));
  InstitucionDestinoPrograma.init(InstitucionDestinoProgramaSchema, InstitucionDestinoPrograma
    .config(sequelize));
  InstitucionProcedencia.init(InstitucionProcedenciaSchema, InstitucionProcedencia
    .config(sequelize));
  Interesado.init(InteresadoSchema, Interesado.config(sequelize));
  EstatusSolicitudRevEquiv.init(EstatusSolicitudRevEquivSchema, EstatusSolicitudRevEquiv
    .config(sequelize));
  SolicitudRevEquiv.init(SolicitudRevEquivSchema, SolicitudRevEquiv.config(sequelize));
  AsignaturaAntecedenteEquivalente
    .init(AsignaturaAntecedenteEquivalenteSchema, AsignaturaAntecedenteEquivalente
      .config(sequelize));
  AsignaturaEquivalentePrograma
    .init(AsignaturaEquivalenteProgramaSchema, AsignaturaEquivalentePrograma
      .config(sequelize));
  FundamentoServicioSocial.init(FundamentoServicioSocialSchema, FundamentoServicioSocial
    .config(sequelize));
  TipoModalidad.init(TipoModalidadSchema, TipoModalidad.config(sequelize));
  ModalidadTitulacion.init(ModalidadTitulacionSchema, ModalidadTitulacion.config(sequelize));
  // Siiges 1.0
  Academia.init(AcademiaSchema, Academia.config(sequelize));
  ProgramaEvaluacion.init(ProgramaEvaluacionSchema, ProgramaEvaluacion.config(sequelize));
  EvaluacionApartado.init(EvaluacionApartadoSchema, EvaluacionApartado.config(sequelize));
  MixtaNoescolarizada.init(MixtaNoescolarizadaSchema, MixtaNoescolarizada.config(sequelize));
  AlumnoObservacion.init(AlumnoObservacionSchema, AlumnoObservacion.config(sequelize));
  Hemerobibliografica.init(HemerobibliograficaSchema, Hemerobibliografica.config(sequelize));
  AsignaturaHemerobibliografica.init(
    AsignaturaHemerobibliograficaSchema,
    AsignaturaHemerobibliografica.config(sequelize),
  );
  Asociacion.init(AsociacionSchema, Asociacion.config(sequelize));
  Bitacora.init(BitacoraSchema, Bitacora.config(sequelize));
  CategoriaEvaluacionPregunta.init(
    CategoriaEvaluacionPreguntaSchema,
    CategoriaEvaluacionPregunta.config(sequelize),
  );
  Dictamen.init(DictamenSchema, Dictamen.config(sequelize));
  Documento.init(DocumentoSchema, Documento.config(sequelize));
  Equivalencia.init(EquivalenciaSchema, Equivalencia.config(sequelize));
  Escala.init(EscalaSchema, Escala.config(sequelize));
  Espejo.init(EspejoSchema, Espejo.config(sequelize));
  EstatusCalificacion.init(EstatusCalificacionSchema, EstatusCalificacion.config(sequelize));
  EvaluacionPregunta.init(EvaluacionPreguntaSchema, EvaluacionPregunta.config(sequelize));
  EvaluacionProceso.init(EvaluacionProcesoSchema, EvaluacionProceso.config(sequelize));
  EvaluacionesEvaluacionPregunta.init(
    EvaluacionesEvaluacionPreguntaSchema,
    EvaluacionesEvaluacionPregunta.config(sequelize),
  );
  EvaluadorModalidad.init(EvaluadorModalidadSchema, EvaluadorModalidad.config(sequelize));
  Experiencia.init(ExperienciaSchema, Experiencia.config(sequelize));
  Institucional.init(InstitucionalSchema, Institucional.config(sequelize));
  Modulo.init(ModuloSchema, Modulo.config(sequelize));
  ModuloRol.init(ModuloRolSchema, ModuloRol.config(sequelize));
  Noticia.init(NoticiaSchema, Noticia.config(sequelize));
  Oficio.init(OficioSchema, Oficio.config(sequelize));
  OficioDetalle.init(OficioDetalleSchema, OficioDetalle.config(sequelize));
  Pago.init(PagoSchema, Pago.config(sequelize));
  Perfil.init(PerfilSchema, Perfil.config(sequelize));
  PlantelDictamen.init(PlantelDictamenSchema, PlantelDictamen.config(sequelize));
  ProgramaEvaluacion.init(ProgramaEvaluacionSchema, ProgramaEvaluacion.config(sequelize));
  Respaldo.init(RespaldoSchema, Respaldo.config(sequelize));
  SolicitudEstatusSolicitud.init(
    SolicitudEstatusSolicitudSchema,
    SolicitudEstatusSolicitud.config(sequelize),
  );
  SolicitudUsuario.init(SolicitudUsuarioSchema, SolicitudUsuario.config(sequelize));
  Testigo.init(TestigoSchema, Testigo.config(sequelize));
  TituloElectronico.init(TituloElectronicoSchema, TituloElectronico.config(sequelize));
  // Siiges 1.0 Fin

  // Associations
  Ciclo.associate(sequelize.models);
  Domicilio.associate(sequelize.models);
  Diligencia.associate(sequelize.models);
  Estado.associate(sequelize.models);
  EstatusSolicitud.associate(sequelize.models);
  File.associate(sequelize.models);
  TipoInstitucion.associate(sequelize.models);
  Institucion.associate(sequelize.models);
  Municipio.associate(sequelize.models);
  Modalidad.associate(sequelize.models);
  Nivel.associate(sequelize.models);
  Pais.associate(sequelize.models);
  Persona.associate(sequelize.models);
  Plantel.associate(sequelize.models);
  Turno.associate(sequelize.models);
  Programa.associate(sequelize.models);
  ProgramaTurno.associate(sequelize.models);
  RatificacionNombre.associate(sequelize.models);
  Representante.associate(sequelize.models);
  Rol.associate(sequelize.models);
  TipoInmueble.associate(sequelize.models);
  TipoSolicitud.associate(sequelize.models);
  Solicitud.associate(sequelize.models);
  Usuario.associate(sequelize.models);
  UsuarioUsuario.associate(sequelize.models);
  Rector.associate(sequelize.models);
  Director.associate(sequelize.models);
  TipoInstalacion.associate(sequelize.models);
  Docente.associate(sequelize.models);
  Area.associate(sequelize.models);
  Seccion.associate(sequelize.models);
  SolicitudSeccion.associate(sequelize.models);
  Higiene.associate(sequelize.models);
  PlantelHigiene.associate(sequelize.models);
  AsignaturaDocente.associate(sequelize.models);
  AsignaturaInfraestructura.associate(sequelize.models);
  Asignatura.associate(sequelize.models);
  Infraestructura.associate(sequelize.models);
  InfraestructuraPrograma.associate(sequelize.models);
  EstatusInspeccion.associate(sequelize.models);
  InspeccionApartado.associate(sequelize.models);
  InspeccionCategoria.associate(sequelize.models);
  InspeccionTipoPregunta.associate(sequelize.models);
  InspeccionPregunta.associate(sequelize.models);
  Inspeccion.associate(sequelize.models);
  InspeccionObservacion.associate(sequelize.models);
  InspeccionInspeccionPregunta.associate(sequelize.models);
  Inspector.associate(sequelize.models);
  InspectorPrograma.associate(sequelize.models);
  Notificacion.associate(sequelize.models);
  Trayectoria.associate(sequelize.models);
  Situacion.associate(sequelize.models);
  TipoTramite.associate(sequelize.models);
  Alumno.associate(sequelize.models);
  AlumnoTipoTramite.associate(sequelize.models);
  EdificioNivel.associate(sequelize.models);
  PlantelEdificioNivel.associate(sequelize.models);
  SaludInstitucion.associate(sequelize.models);
  SeguridadSistema.associate(sequelize.models);
  PlantelSeguridadSistema.associate(sequelize.models);
  Cumplimiento.associate(sequelize.models);
  Evaluacion.associate(sequelize.models);
  Evaluador.associate(sequelize.models);
  Grado.associate(sequelize.models);
  CicloEscolar.associate(sequelize.models);
  Grupo.associate(sequelize.models);
  Formacion.associate(sequelize.models);
  FormacionRector.associate(sequelize.models);
  FormacionDirector.associate(sequelize.models);
  FormacionDocente.associate(sequelize.models);
  AlumnoGrupo.associate(sequelize.models);
  Calificacion.associate(sequelize.models);
  SituacionValidacion.associate(sequelize.models);
  TipoValidacion.associate(sequelize.models);
  Validacion.associate(sequelize.models);
  EstatusVigilancia.associate(sequelize.models);
  VigilanciaApartado.associate(sequelize.models);
  VigilanciaCategoria.associate(sequelize.models);
  VigilanciaTipoPregunta.associate(sequelize.models);
  VigilanciaPregunta.associate(sequelize.models);
  Vigilancia.associate(sequelize.models);
  VigilanciaObservacion.associate(sequelize.models);
  VigilanciaVigilanciaPregunta.associate(sequelize.models);
  Vigilante.associate(sequelize.models);
  VigilanteVigilancia.associate(sequelize.models);
  Sesion.associate(sequelize.models);
  Periodo.associate(sequelize.models);
  OrganoColegiado.associate(sequelize.models);
  Acuerdo.associate(sequelize.models);
  PlanMaestro.associate(sequelize.models);
  Proyecto.associate(sequelize.models);
  ResponsableObra.associate(sequelize.models);
  ResponsablePlaneacion.associate(sequelize.models);
  ProyectoEspacio.associate(sequelize.models);
  ProyectoTipoProyecto.associate(sequelize.models);
  PresupuestoEgreso.associate(sequelize.models);
  Presupuesto.associate(sequelize.models);
  TipoPresupuesto.associate(sequelize.models);
  TipoRecursoPresupuesto.associate(sequelize.models);
  TipoEgreso.associate(sequelize.models);
  TipoSolicitudFolio.associate(sequelize.models);
  TipoDocumento.associate(sequelize.models);
  EstatusSolicitudFolio.associate(sequelize.models);
  SolicitudFolio.associate(sequelize.models);
  SolicitudFolioAlumno.associate(sequelize.models);
  Libro.associate(sequelize.models);
  Foja.associate(sequelize.models);
  FolioDocumentoAlumno.associate(sequelize.models);
  InstitucionDestino.associate(sequelize.models);
  InstitucionDestinoPrograma.associate(sequelize.models);
  InstitucionProcedencia.associate(sequelize.models);
  Interesado.associate(sequelize.models);
  EstatusSolicitudRevEquiv.associate(sequelize.models);
  SolicitudRevEquiv.associate(sequelize.models);
  AsignaturaAntecedenteEquivalente.associate(sequelize.models);
  AsignaturaEquivalentePrograma.associate(sequelize.models);
  FundamentoServicioSocial.associate(sequelize.models);
  TipoModalidad.associate(sequelize.models);
  ModalidadTitulacion.associate(sequelize.models);
  // Siiges 1.0
  Academia.associate(sequelize.models);
  AlumnoObservacion.associate(sequelize.models);
  AsignaturaHemerobibliografica.associate(sequelize.models);
  Asociacion.associate(sequelize.models);
  Bitacora.associate(sequelize.models);
  CategoriaEvaluacionPregunta.associate(sequelize.models);
  Dictamen.associate(sequelize.models);
  Documento.associate(sequelize.models);
  Equivalencia.associate(sequelize.models);
  Escala.associate(sequelize.models);
  Espejo.associate(sequelize.models);
  EstatusCalificacion.associate(sequelize.models);
  EvaluacionApartado.associate(sequelize.models);
  EvaluacionPregunta.associate(sequelize.models);
  EvaluacionProceso.associate(sequelize.models);
  EvaluacionesEvaluacionPregunta.associate(sequelize.models);
  EvaluadorModalidad.associate(sequelize.models);
  Experiencia.associate(sequelize.models);
  Hemerobibliografica.associate(sequelize.models);
  Institucional.associate(sequelize.models);
  MixtaNoescolarizada.associate(sequelize.models);
  Modulo.associate(sequelize.models);
  ModuloRol.associate(sequelize.models);
  Noticia.associate(sequelize.models);
  OficioDetalle.associate(sequelize.models);
  Oficio.associate(sequelize.models);
  Pago.associate(sequelize.models);
  Perfil.associate(sequelize.models);
  PlantelDictamen.associate(sequelize.models);
  ProgramaEvaluacion.associate(sequelize.models);
  Respaldo.associate(sequelize.models);
  SolicitudEstatusSolicitud.associate(sequelize.models);
  SolicitudUsuario.associate(sequelize.models);
  Testigo.associate(sequelize.models);
  TituloElectronico.associate(sequelize.models);
  // Siiges 1.0 Fin

  SolicitudBeca.init( SolicitudBecaSchema, SolicitudBeca.config(sequelize));
  SolicitudBecaAlumno.init(SolicitudBecaAlumnoSchema, SolicitudBecaAlumno.config(sequelize));
  TipoSolicitudBeca.init( TipoSolicitudBecaSchema,TipoSolicitudBeca.config(sequelize));
  EstatusAlumnoBeca.init( EstatusAlumnoBecaSchema,EstatusAlumnoBeca.config(sequelize));
  EstatusSolicitudBeca.init( EstatusSolicitudBecaSchema,EstatusSolicitudBeca.config(sequelize));
}

module.exports = setupModels;
