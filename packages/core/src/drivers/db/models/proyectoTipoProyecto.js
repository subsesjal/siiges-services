const { Sequelize, Model, DataTypes } = require('sequelize');
const { PROYECTO_TABLE } = require('./proyecto');
const { TIPO_PROYECTO_TABLE } = require('./tipoProyecto');

const PROYECTO_TIPO_PROYECTO_TABLE = 'proyectos_tipo_proyectos';

const ProyectoTipoProyectoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  proyectoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'proyecto_id',
    references: {
      model: PROYECTO_TABLE,
      key: 'id',
    },
  },
  tipoProyectoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_proyecto_id',
    references: {
      model: TIPO_PROYECTO_TABLE,
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

class ProyectoTipoProyecto extends Model {
  static associate(models) {
    this.belongsTo(models.TipoProyecto, {
      as: 'tipoProyecto',
    });
    this.belongsTo(models.Proyecto, { as: 'proyecto' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROYECTO_TIPO_PROYECTO_TABLE,
      modelName: 'ProyectoTipoProyecto',
      timestamps: false,
    };
  }
}

module.exports = {
  PROYECTO_TIPO_PROYECTO_TABLE,
  ProyectoTipoProyectoSchema,
  ProyectoTipoProyecto,
};
