const { Model, DataTypes, Sequelize } = require('sequelize');
const { ESTADO_TABLE } = require('./estado');

const MUNICIPIO_TABLE = 'municipios';

const MunicipioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  estadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'estado_id',
    references: {
      model: ESTADO_TABLE,
      key: 'id',
    },
  },
  municipio: {
    allowNull: false,
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

class Municipio extends Model {
  static associate(models) {
    this.belongsTo(models.Estado, { as: 'estado' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MUNICIPIO_TABLE,
      modelName: 'Municipio',
      timestamps: false,
    };
  }
}

module.exports = { MUNICIPIO_TABLE, MunicipioSchema, Municipio };
