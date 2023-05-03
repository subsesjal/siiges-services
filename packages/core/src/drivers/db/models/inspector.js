const { Model, DataTypes, Sequelize } = require('sequelize');
const { PERSONA_TABLE } = require('./persona');

const INSPECTOR_TABLE = 'inspectores';

const InspectorSchema = {
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
  programaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'programa_id',
    references: {
      model: PERSONA_TABLE,
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
class Inspector extends Model {
  static associate(models) {
    this.belongsTo(models.Persona, { as: 'persona' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECTOR_TABLE,
      modelName: 'Inspector',
      timestamps: false,
    };
  }
}

module.exports = { INSPECTOR_TABLE, InspectorSchema, Inspector };
