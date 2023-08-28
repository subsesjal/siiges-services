const { Model, DataTypes, Sequelize } = require('sequelize');
const { PLANTEL_TABLE } = require('./plantel');
const { EDIFICIO_NIVEL_TABLE } = require('./edificioNivel');

const PLANTEL_EDIFICIO_NIVEL_TABLE = 'planteles_edificios_niveles';

const PlantelEdificioNivelSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  plantelId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'plantel_id',
    references: {
      model: PLANTEL_TABLE,
      key: 'id',
    },
  },
  edificioNivelId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'edificio_nivel_id',
    references: {
      model: EDIFICIO_NIVEL_TABLE,
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

class PlantelEdificioNivel extends Model {
  static associate(models) {
    this.belongsTo(models.Plantel, { as: 'plantel' });
    this.belongsTo(models.EdificioNivel, { as: 'edificioNivel' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PLANTEL_EDIFICIO_NIVEL_TABLE,
      modelName: 'PlantelEdificioNivel',
      timestamps: false,
    };
  }
}
module.exports = { PLANTEL_EDIFICIO_NIVEL_TABLE, PlantelEdificioNivelSchema, PlantelEdificioNivel };
