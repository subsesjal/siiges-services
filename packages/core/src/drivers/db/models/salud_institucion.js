const { Model, Sequelize, DataTypes } = require('sequelize');
const { PLANTEL_TABLE } = require('./plantel');

const SALUD_INSTITUCION_TABLE = 'salud_instituciones';

const SaludInstitucionSchema = {
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

  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  tiempo: {
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

class SaludInstitucion extends Model {
  static associate(models) {
    this.belongsTo(models.Plantel, { as: 'plantel' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SALUD_INSTITUCION_TABLE,
      modelName: 'SaludInstitucion',
      timestamps: false,
    };
  }
}

module.exports = { SaludInstitucion, SaludInstitucionSchema, SALUD_INSTITUCION_TABLE };
