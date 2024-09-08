const { Model, DataTypes, Sequelize } = require('sequelize');
const { EVALUADOR_TABLE } = require('./evaluador');

const INSTITUCIONAL_TABLE = 'institucionales';

const InstitucionalSchema = {
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
  institucion: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  nombramiento: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  departamento: {
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

class Institucional extends Model {
  static associate(models) {
    this.belongsTo(models.Evaluador, { as: 'evaluador' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSTITUCIONAL_TABLE,
      modelName: 'Institucional',
      timestamps: false,
    };
  }
}

module.exports = { INSTITUCIONAL_TABLE, InstitucionalSchema, Institucional };
