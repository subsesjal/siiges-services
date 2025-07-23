const { Model, DataTypes, Sequelize } = require('sequelize');
const { ALUMNO_TABLE } = require('./alumno');
const { SOLICITUD_FOLIO_TABLE } = require('./solicitudFolio');
const { MODALIDAD_TITULACION_TABLE } = require('./modalidadTitulacion');
const { FUNDAMENTO_SERVICIO_SOCIAL_TABLE } = require('./fundamentoServicioSocial');

const SOLICITUD_FOLIO_ALUMNO_TABLE = 'solicitudes_folios_alumnos';

const SolicitudFolioAlumnoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  alumnoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'alumno_id',
    references: {
      model: ALUMNO_TABLE,
      key: 'id',
    },
  },
  solicitudFolioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'solicitud_folio_id',
    references: {
      model: SOLICITUD_FOLIO_TABLE,
      key: 'id',
    },
  },
  modalidadTitulacionId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'modalidad_titulacion_id',
    references: {
      model: MODALIDAD_TITULACION_TABLE,
      key: 'id',
    },
  },
  fundamentoServicioSocialId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: 'fundamento_servicio_social_id',
    references: {
      model: FUNDAMENTO_SERVICIO_SOCIAL_TABLE,
      key: 'id',
    },
  },
  cumplioServicioSocial: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
    field: 'cumplio_servicio_social',
  },
  fechaInicio: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'fecha_inicio',
  },
  fechaTerminacion: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'fecha_terminacion',
  },
  fechaElaboracion: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'fecha_elaboracion',
  },
  folioActa: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'folio_acta',
  },
  fechaExpedicion: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'fecha_expedicion',
  },
  fechaExamenProfesional: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'fecha_examen_profesional',
  },
  fechaExencionExamenProfesional: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'fecha_exencion_examen_profesional',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: null,
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'deleted_at',
    defaultValue: null,
  },
};

class SolicitudFolioAlumno extends Model {
  static associate(models) {
    this.belongsTo(models.Alumno, { as: 'alumno' });
    this.belongsTo(models.SolicitudFolio, { as: 'solicitudFolio' });
    this.belongsTo(models.FundamentoServicioSocial, { as: 'fundamentoServicioSocial' });
    this.hasOne(models.FolioDocumentoAlumno, { as: 'folioDocumentoAlumno', foreignKey: 'solicitudFolioAlumnoId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOLICITUD_FOLIO_ALUMNO_TABLE,
      modelName: 'SolicitudFolioAlumno',
      timestamps: false,
    };
  }
}

module.exports = { SOLICITUD_FOLIO_ALUMNO_TABLE, SolicitudFolioAlumnoSchema, SolicitudFolioAlumno };
