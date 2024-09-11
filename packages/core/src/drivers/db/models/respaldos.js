const { Model, DataTypes, Sequelize } = require('sequelize');
const { MIXTA_NOESCOLARIZADA_TABLE } = require('./mixtaNoEscolarizadas');

const RESPALDO_TABLE = 'respaldos';

const RespaldoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  mixtaNoescolarizadaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'mixta_noescolarizada_id',
    references: {
      model: MIXTA_NOESCOLARIZADA_TABLE,
      key: 'id',
    },
  },
  proceso: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  periodicidad: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  mediosAlmacenamiento: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'medios_almacenamiento',
  },
  descripcion: {
    allowNull: true,
    type: DataTypes.TEXT,
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
};

class Respaldo extends Model {
  static associate(models) {
    this.belongsTo(models.MixtaNoescolarizada, { as: 'mixtaNoescolarizada' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RESPALDO_TABLE,
      modelName: 'Respaldo',
      timestamps: false,
    };
  }
}

module.exports = { RESPALDO_TABLE, RespaldoSchema, Respaldo };
