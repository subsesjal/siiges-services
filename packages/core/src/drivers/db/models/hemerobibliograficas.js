const { Model, DataTypes, Sequelize } = require('sequelize');
const { PLANTEL_TABLE } = require('./plantel');

const HEMEROBIBLIOGRAFICA_TABLE = 'hemerobibliograficas';

const HemerobibliograficaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  plantelId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'plantel_id',
    references: {
      model: PLANTEL_TABLE,
      key: 'id',
    },
  },
  titulo: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  autor: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  ejemplares: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  editorial: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  anio: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  tipo: {
    allowNull: false,
    type: DataTypes.INTEGER,
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

class Hemerobibliografica extends Model {
  static associate(models) {
    this.belongsTo(models.Plantel, { as: 'plantel' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: HEMEROBIBLIOGRAFICA_TABLE,
      modelName: 'Hemerobibliografica',
      timestamps: false,
    };
  }
}

module.exports = { HEMEROBIBLIOGRAFICA_TABLE, HemerobibliograficaSchema, Hemerobibliografica };
