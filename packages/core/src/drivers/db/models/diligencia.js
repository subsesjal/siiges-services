const { Model, DataTypes, Sequelize } = require('sequelize');
const { PERSONA_TABLE } = require('./persona');
const { SOLICITUD_TABLE } = require('./solicitud');

const DILIGENCIA_TABLE = 'diligencia';

const DiligenciaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  solicitudId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'solicitud_id',
    references: {
      model: SOLICITUD_TABLE,
      key: 'id',
    },
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

  horaInicio: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'hora_inicio',
  },

  horaFin: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'hora_fin',
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

class Diligencia extends Model {
  static associate(models) {
    this.belongsTo(models.Persona, { as: 'persona' });
    this.belongsTo(models.Solicitud, { as: 'solicitud' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DILIGENCIA_TABLE,
      modelName: 'Diligencia',
      timestamps: false,
    };
  }
}

module.exports = { DILIGENCIA_TABLE, DiligenciaSchema, Diligencia };
