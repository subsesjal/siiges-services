const { Model, DataTypes, Sequelize } = require('sequelize');
const { PERSONA_TABLE } = require('./persona');
const { INSPECCION_TABLE } = require('./inspeccion');

const TESTIGO_TABLE = 'testigos';

const TestigoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  personaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'persona_id',
    references: {
      model: PERSONA_TABLE,
      key: 'id',
    },
  },
  inspeccionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'inspeccion_id',
    references: {
      model: INSPECCION_TABLE,
      key: 'id',
    },
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

class Testigo extends Model {
  static associate(models) {
    this.belongsTo(models.Persona, { as: 'persona' });
    this.belongsTo(models.Inspeccion, { as: 'inspeccion' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TESTIGO_TABLE,
      modelName: 'Testigo',
      timestamps: false,
    };
  }
}

module.exports = { TESTIGO_TABLE, TestigoSchema, Testigo };
