const { Model, DataTypes, Sequelize } = require('sequelize');
const { SOLICITUD_TABLE } = require('./solicitud');
const { SECCION_TABLE } = require('./seccion');

const SOLICITUD_SECCION_TABLE = 'solicitudes_secciones';

const SolicitudSeccionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  solicitudId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'solicitud_id',
    references: {
      model: SOLICITUD_TABLE,
      key: 'id',
    },
  },
  seccionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'seccion_id',
    references: {
      model: SECCION_TABLE,
      key: 'id',
    },
  },
  isClosed: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'is_closed',
  },
  observaciones: {
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

class SolicitudSeccion extends Model {
  static associate(models) {
    this.belongsTo(models.Solicitud, { as: 'solicitud' });
    this.belongsTo(models.Seccion, { as: 'seccion' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOLICITUD_SECCION_TABLE,
      modelName: 'SolicitudSeccion',
      timestamps: false,
    };
  }
}

module.exports = { SOLICITUD_SECCION_TABLE, SolicitudSeccionSchema, SolicitudSeccion };
