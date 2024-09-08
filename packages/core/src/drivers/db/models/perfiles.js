const { Model, DataTypes, Sequelize } = require('sequelize');
const { EVALUADOR_TABLE } = require('./evaluador');

const PERFIL_TABLE = 'perfiles';

const PerfilSchema = {
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
  nombre: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  aplica: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  fecha: {
    allowNull: true,
    type: DataTypes.DATEONLY,
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

class Perfil extends Model {
  static associate(models) {
    this.belongsTo(models.Evaluador, { as: 'evaluador' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PERFIL_TABLE,
      modelName: 'Perfil',
      timestamps: false,
    };
  }
}

module.exports = { PERFIL_TABLE, PerfilSchema, Perfil };
