const { Model, DataTypes, Sequelize } = require('sequelize');
const { EVALUADOR_TABLE } = require('./evaluador');
const { MODALIDAD_TABLE } = require('./modalidad');

const EVALUADOR_MODALIDAD_TABLE = 'evaluadores_modalidades';

const EvaluadorModalidadSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  evaluadorId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'evaluador_id',
    references: {
      model: EVALUADOR_TABLE,
      key: 'id',
    },
  },
  modalidadId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'modalidad_id',
    references: {
      model: MODALIDAD_TABLE,
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

class EvaluadorModalidad extends Model {
  static associate(models) {
    this.belongsTo(models.Evaluador, { as: 'evaluador' });
    this.belongsTo(models.Modalidad, { as: 'modalidad' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EVALUADOR_MODALIDAD_TABLE,
      modelName: 'EvaluadorModalidad',
      timestamps: false,
    };
  }
}

module.exports = { EVALUADOR_MODALIDAD_TABLE, EvaluadorModalidadSchema, EvaluadorModalidad };
