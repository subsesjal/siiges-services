const { Model, DataTypes, Sequelize } = require('sequelize');
const { SOLICITUD_FOLIOS_TABLE } = require('./solicitudFolios');
const { ALUMNOS_TABLE } = require('./alumno');
const { FOJA_TABLE } = require('./foja');

const SOLICITUDES_CERTIFICADOS_ALUMNOS_TABLE = 'solicitudes_certificados_alumnos';

const SolicitudesCertificadosAlumnosSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  solicitudFoliosId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'solicitud_folios_id',
    references: {
      model: SOLICITUD_FOLIOS_TABLE,
      key: 'id',
    },
  },
  alumnoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'alumno_id',
    references: {
      model: ALUMNOS_TABLE,
      key: 'id',
    },
  },
  fojaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'foja_id',
    unique: true,
    references: {
      model: FOJA_TABLE,
      key: 'id',
    },
  },
  fecha_termino_estudios: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  fecha_elaboracion: {
    allowNull: false,
    type: DataTypes.DATE,
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
class SolicitudesCertificadosAlumnos extends Model {
  static associate(models) {
    this.belongsTo(models.Alumno, { as: 'alumno' });
    this.belongsTo(models.Foja, { as: 'foja' });
    this.belongsTo(models.SolicitudFolios, { as: 'solicitud_folios' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOLICITUDES_CERTIFICADOS_ALUMNOS_TABLE,
      modelName: 'SolicitudesCertificadosAlumnos',
      timestamps: false,
    };
  }
}

module.exports = {
  SOLICITUDES_CERTIFICADOS_ALUMNOS_TABLE,
  SolicitudesCertificadosAlumnosSchema,
  SolicitudesCertificadosAlumnos,
};
