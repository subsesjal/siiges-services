const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROYECTO_TABLE } = require('./proyecto');

const PROYECTO_ESPACIO_TABLE = 'proyectos_espacios';

const ProyectoEspacioSchema = {
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
  nombre: {
    type: DataTypes.STRING,
  },
  cantidad: {
    type: DataTypes.INTEGER,
  },
  metrosCuadrados: {
    type: DataTypes.INTEGER,
    field: 'metros_cuadrados',
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

class ProyectoEspacio extends Model {
  static associate(models) {
    this.belongsTo(models.Proyecto, { as: 'proyecto' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROYECTO_ESPACIO_TABLE,
      modelName: 'ProyectoEspacio',
      timestamps: false,
    };
  }
}

module.exports = {
  PROYECTO_ESPACIO_TABLE,
  ProyectoEspacioSchema,
  ProyectoEspacio,
};
