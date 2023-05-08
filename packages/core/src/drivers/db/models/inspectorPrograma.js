const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROGRAMA_TABLE } = require('./programa');
const { INSPECTOR_TABLE } = require('./inspector');

const INSPECTOR_PROGRAMA_TABLE = 'inspectores_programas';

const InspectorProgramaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  inspectorId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'inspector_id',
    references: {
      model: INSPECTOR_TABLE,
      key: 'id',
    },
  },
  programaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'programa_id',
    references: {
      model: PROGRAMA_TABLE,
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
class InspectorPrograma extends Model {
  static associate(models) {
    this.belongsTo(models.Inspector, { as: 'inspector' });
    this.belongsTo(models.Programa, { as: 'programa' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECTOR_PROGRAMA_TABLE,
      modelName: 'InspecctorPrograma',
      timestamps: false,
    };
  }
}

module.exports = { INSPECTOR_PROGRAMA_TABLE, InspectorProgramaSchema, InspectorPrograma };
