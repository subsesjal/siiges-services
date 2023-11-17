const { Model, DataTypes, Sequelize } = require('sequelize');
const { PERSONA_TABLE } = require('./persona');

const VIGILANTE_TABLE = 'vigilantes';

const VigilanteSchema = {
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

class Vigilante extends Model {
  static associate(models) {
    this.belongsTo(models.Persona, { as: 'persona' });
    this.hasMany(models.VigilantePrograma, { as: 'vigilantePrograma', foreignKey: 'vigilanteId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VIGILANTE_TABLE,
      modelName: 'Vigilante',
      timestamps: false,
    };
  }
}

module.exports = { VIGILANTE_TABLE, VigilanteSchema, Vigilante };
