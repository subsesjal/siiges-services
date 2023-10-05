const { Model, DataTypes, Sequelize } = require('sequelize');
const { MODALIDAD_TABLE } = require('./modalidad');

const CUMPLIMIENTO_TABLE = 'cumplimientos';

const CumplimientoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  porcentajeCumplimiento: {
    type: DataTypes.INTEGER,
    field: 'porcentaje_cumplimiento',
  },
  cumplimientoMinimo: {
    type: DataTypes.INTEGER,
    field: 'cumplimiento_minimo',
  },
  cumplimientoMaximo: {
    type: DataTypes.INTEGER,
    field: 'cumplimiento_maximo',
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

class Cumplimiento extends Model {
  static associate(models) {
    this.belongsTo(models.Modalidad, { as: 'modalidad' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUMPLIMIENTO_TABLE,
      modelName: 'Cumplimiento',
      timestamps: false,
    };
  }
}

module.exports = {
  CUMPLIMIENTO_TABLE,
  CumplimientoSchema,
  Cumplimiento,
};
