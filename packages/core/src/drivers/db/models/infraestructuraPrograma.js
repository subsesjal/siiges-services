const { Model, DataTypes, Sequelize } = require('sequelize');
const { INFRAESTRUCTURA_TABLE } = require('./infraestructura');
const { PROGRAMA_TABLE } = require('./programa');

const INFRAESTRUCTURA_PROGRAMA_TABLE = 'infraestructuras_programas';

const InfraestructuraProgramaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  infraestructuraId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'infraestructura_id',
    references: {
      model: INFRAESTRUCTURA_TABLE,
      key: 'id',
    },
  },
  programaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'programa_id',
    references: {
      model: PROGRAMA_TABLE,
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

class InfraestructuraPrograma extends Model {
  static associate(models) {
    this.belongsTo(models.Infraestructura, { as: 'infraestructura' });
    this.belongsTo(models.Programa, { as: 'programa' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INFRAESTRUCTURA_PROGRAMA_TABLE,
      modelName: 'InfraestructuraPrograma',
      timestamps: false,
    };
  }
}

module.exports = {
  INFRAESTRUCTURA_PROGRAMA_TABLE,
  InfraestructuraProgramaSchema,
  InfraestructuraPrograma,
};
