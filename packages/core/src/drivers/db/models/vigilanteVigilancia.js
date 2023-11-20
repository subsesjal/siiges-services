const { Model, DataTypes, Sequelize } = require('sequelize');
const { VIGILANTE_TABLE } = require('./vigilante');
const { VIGILANCIA_TABLE } = require('./vigilancia');

const VIGILANTE_VIGILANCIA_TABLE = 'vigilantes_vigilancias';

const VigilanteVigilanciaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  vigilanteId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'vigilante_id',
    references: {
      model: VIGILANTE_TABLE,
      key: 'id',
    },
  },
  vigilanciaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'vigilancia_id',
    references: {
      model: VIGILANCIA_TABLE,
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
class VigilanteVigilancia extends Model {
  static associate(models) {
    this.belongsTo(models.Vigilante, { as: 'vigilante' });
    this.belongsTo(models.Vigilancia, { as: 'vigilancia' });
    this.belongsTo(models.Inspeccion, { as: 'inspeccion' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VIGILANTE_VIGILANCIA_TABLE,
      modelName: 'VigilanteVigilancia',
      timestamps: false,
    };
  }
}

module.exports = { VIGILANTE_VIGILANCIA_TABLE, VigilanteVigilanciaSchema, VigilanteVigilancia };
