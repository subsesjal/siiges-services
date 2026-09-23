const EXCLUDED_MODELS = [
  'Bitacora',
  'Sesion',
  'TokenRecoveryPassword',
  'TokenExterno',
  'TokenServiciosExternos',
  'Notificacion',
  'Respaldo',
  // Catálogos administrados directo en BD, fuera del alcance de esta auditoría
  'Estado', 'Municipio', 'Pais',
  'Area', 'Nivel', 'Grado', 'Turno', 'Modalidad', 'TipoModalidad',
  'ModalidadServicioSocial', 'ModalidadTitulacion', 'Ciclo', 'CicloEscolar',
  'CatalogoCicloEscolar', 'Seccion',
  'TipoAlumnoBeca', 'TipoDocumento', 'TipoEgreso', 'TipoInmueble',
  'TipoInstalacion', 'TipoInstitucion', 'TipoPresupuesto', 'TipoProyecto',
  'TipoRecursoPresupuesto', 'TipoSolicitud', 'TipoSolicitudFolio',
  'TipoTramite', 'TipoValidacion',
  'EstatusAlumnoBeca', 'EstatusCalificacion', 'EstatusInspeccion',
  'EstatusSolicitud', 'EstatusSolicitudBeca', 'EstatusSolicitudFolio',
  'EstatusSolicitudRevEquiv', 'EstatusSolicitudServicioSocial',
  'EstatusVigilancia',
  'Situacion', 'SituacionValidacion',
  'Cargo', 'Rol', 'Modulo', 'ModuloRol', 'Perfil',
  'Escala', 'Espejo', 'OrganoColegiado',
];

module.exports = EXCLUDED_MODELS;
