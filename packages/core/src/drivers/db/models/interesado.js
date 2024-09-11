const { Model, DataTypes, Sequelize } = require('sequelize');
const { PERSONA_TABLE } = require('./persona');
const { INSTITUCION_PROCEDENCIA_TABLE } = require('./institucionProcedencia');
const { INSTITUCION_DESTINO_TABLE } = require('./institucionDestino');

const INTERESADO_TABLE = 'interesados';

const InteresadoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  personaId: {
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER,
    field: 'persona_id',
    references: {
      model: PERSONA_TABLE,
      key: 'id',
    },
  },
  institucionProcedenciaId: {
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER,
    field: 'institucion_procedencia_id',
    references: {
      model: INSTITUCION_PROCEDENCIA_TABLE,
      key: 'id',
    },
  },
  institucionDestinoId: {
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER,
    field: 'institucion_destino_id',
    references: {
      model: INSTITUCION_DESTINO_TABLE,
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

class Interesado extends Model {
  static associate(models) {
    this.belongsTo(models.Persona, { as: 'persona' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INTERESADO_TABLE,
      modelName: 'Interesado',
      timestamps: false,
    };
  }
}

module.exports = { INTERESADO_TABLE, InteresadoSchema, Interesado };
