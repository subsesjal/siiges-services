const { Model, DataTypes, Sequelize } = require('sequelize');

const EVALUACION_APARTADO_TABLE = 'evaluacion_apartados';

const EvaluacionApartadoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
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

class EvaluacionApartado extends Model {
  static associate() {
    // Define associations here if needed
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EVALUACION_APARTADO_TABLE,
      modelName: 'EvaluacionApartado',
      timestamps: false,
    };
  }
}

module.exports = { EVALUACION_APARTADO_TABLE, EvaluacionApartadoSchema, EvaluacionApartado };
