const { Model, DataTypes, Sequelize } = require('sequelize');
const { LIBRO_TABLE } = require('./libro');

const FOJA_TABLE = 'fojas';

const FojaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  libroId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'libro_id',
    references: {
      model: LIBRO_TABLE,
      key: 'id',
    },
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
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

class Foja extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FOJA_TABLE,
      modelName: 'Foja',
      timestamps: false,
    };
  }
}
module.exports = {
  FOJA_TABLE,
  FojaSchema,
  Foja,
};
