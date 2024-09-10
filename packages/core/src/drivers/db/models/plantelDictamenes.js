const { Model, DataTypes, Sequelize } = require('sequelize');
const { PLANTEL_TABLE } = require('./plantel');

const PLANTEL_DICTAMEN_TABLE = 'plantel_dictamenes';

const PlantelDictamenSchema = {
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
    allowNull: true,
    type: DataTypes.STRING,
  },
  fechaEmision: {
    allowNull: true,
    type: DataTypes.DATEONLY,
    field: 'fecha_emision',
  },
  autoridad: {
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
};

class PlantelDictamen extends Model {
  static associate(models) {
    this.belongsTo(models.Plantel, { as: 'plantel' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PLANTEL_DICTAMEN_TABLE,
      modelName: 'PlantelDictamen',
      timestamps: false,
    };
  }
}

module.exports = { PLANTEL_DICTAMEN_TABLE, PlantelDictamenSchema, PlantelDictamen };
