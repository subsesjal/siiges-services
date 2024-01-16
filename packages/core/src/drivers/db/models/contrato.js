const { Model, DataTypes, Sequelize } = require('sequelize');

const CONTRATO_TABLE = 'contratos';

const ContratoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  numeroDeContrato: {
    type: DataTypes.STRING,
    field: 'numero_de_contrato',
  },
  fechaInicio: {
    field: 'fecha_inicio',
    type: DataTypes.DATE,
  },
  fechaFin: {
    field: 'fecha_fin',
    type: DataTypes.DATE,
  },
  contratista: {
    type: DataTypes.STRING,
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

class Contrato extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: CONTRATO_TABLE,
      modelName: 'Contrato',
      timestamps: false,
    };
  }
}

module.exports = {
  CONTRATO_TABLE,
  ContratoSchema,
  Contrato,
};
