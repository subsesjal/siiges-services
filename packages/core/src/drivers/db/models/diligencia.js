const { Model, DataTypes } = require('sequelize');
const { USUARIO_TABLE } = require('./persona');

const DILIGENCIA_TABLE = 'diligencia';

const DiligenciaSchema = {
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
      model: USUARIO_TABLE,
      key: 'id',
    },
  },

  startTime: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'start_time',
  },

  endTieme: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'start_time',
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

class Diligencia extends Model {
  static associate(models) {
    this.hasOne(models.Usuario, {
      as: 'usuario',
      foreignKey: 'rolId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DILIGENCIA_TABLE,
      modelName: 'Representante',
      timestamps: false,
    };
  }
}

module.exports = { DILIGENCIA_TABLE, DiligenciaSchema, Diligencia };
