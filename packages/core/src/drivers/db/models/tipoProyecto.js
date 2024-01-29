const { Model, DataTypes, Sequelize } = require('sequelize');

const TIPO_PROYECTO_TABLE = 'tipo_proyectos';

const TipoProyectoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  obraNueva: {
    field: 'obra_nueva',
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  obraDeContinuidad: {
    field: 'obra_de_continuidad',
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  equipamiento: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  adecuaciones: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  mantenimiento: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  proyectoSustentable: {
    field: 'codigo_sustentable',
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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

class TipoProyecto extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: TIPO_PROYECTO_TABLE,
      modelName: 'TipoProyecto',
      timespamps: false,
    };
  }
}

module.exports = {
  TIPO_PROYECTO_TABLE,
  TipoProyectoSchema,
  TipoProyecto,
};
