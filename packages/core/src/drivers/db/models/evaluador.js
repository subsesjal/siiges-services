const { Model, DataTypes, Sequelize } = require('sequelize');
const { PERSONA_TABLE } = require('./persona');

const EVALUADOR_TABLE = 'evaluadores';

const EvaluadorSchema = {
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
  tipoEvaluador: {
    type: DataTypes.INTEGER,
    field: 'tipo_evaluador',
  },
  especialidad: {
    type: DataTypes.STRING,
  },
  otrosRegistros: {
    type: DataTypes.STRING,
  },
  logros: {
    type: DataTypes.TEXT,
  },
  numeroEvaluador: {
    type: DataTypes.STRING,
    field: 'numero_evaluador',
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

class Evaluador extends Model {
  static associate(models) {
    this.belongsTo(models.Persona, { as: 'persona' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EVALUADOR_TABLE,
      modelName: 'Evaluador',
      timestamps: false,
    };
  }
}

module.exports = {
  Evaluador,
  EvaluadorSchema,
  EVALUADOR_TABLE,
};
