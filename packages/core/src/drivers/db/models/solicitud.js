const { Model, DataTypes, Sequelize } = require('sequelize');
const { TIPO_SOLICITUD_TABLE } = require('./tipoSolicitud');
const { USUARIO_TABLE } = require('./usuario');
const { ESTATUS_SOLICITUD_TABLE } = require('./estatusSolicitud');

const SOLICITUD_TABLE = 'solicitudes';

const SolicitudSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  tipoSolicitudId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_solicitud_id',
    references: {
      model: TIPO_SOLICITUD_TABLE,
      key: 'id',
    },
  },
  usuarioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'usuario_id',
    references: {
      model: USUARIO_TABLE,
      key: 'id',
    },
  },
  estatusSolicitudId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'estatus_solicitud_id',
    references: {
      model: ESTATUS_SOLICITUD_TABLE,
      key: 'id',
    },
  },
  fecha: {
    type: DataTypes.DATE,
  },
  cita: {
    type: DataTypes.DATE,
  },
  fechaRecepcion: {
    type: DataTypes.DATE,
    field: 'fecha_recepcion',
  },
  folio: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  convocatoria: {
    type: DataTypes.STRING,
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

class Solicitud extends Model {
  static associate(models) {
    this.belongsTo(models.TipoSolicitud, { as: 'tipoSolicitud' });
    this.belongsTo(models.Usuario, { as: 'usuario' });
    this.belongsTo(models.EstatusSolicitud, { as: 'estatusSolicitud' });
    this.hasOne(models.Programa, { as: 'programa', foreignKey: 'solicitudId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOLICITUD_TABLE,
      modelName: 'Solicitud',
      timestamps: false,
    };
  }
}
module.exports = { SOLICITUD_TABLE, SolicitudSchema, Solicitud };
