const { Model, DataTypes, Sequelize } = require('sequelize');
const { SOLICITUD_TABLE } = require('./solicitud');

const OFICIO_TABLE = 'oficios';

const OficioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  oficio: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  fecha: {
    allowNull: true,
    type: DataTypes.DATEONLY,
  },
  documento: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: null,
  },
  deletedAt: {
    type: DataTypes.DATE,
    field: 'deleted_at',
    defaultValue: null,
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
};

class Oficio extends Model {
  static associate(models) {
    this.belongsTo(models.Solicitud, { as: 'solicitud' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: OFICIO_TABLE,
      modelName: 'Oficio',
      timestamps: false,
    };
  }
}

module.exports = { OFICIO_TABLE, OficioSchema, Oficio };
