const { Model, DataTypes, Sequelize } = require('sequelize');

const TIPO_DE_PROYECTO_TABLE = 'tipo_de_proyecto';

const TipoDeProyectoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  obraNueva: {
    field: 'obra_nueva',
    type: DataTypes.BOOLEAN,
  },
  obraDeContinuidad: {
    field: 'obra_de_continuidad',
    type: DataTypes.BOOLEAN,
  },
  equipamiento: {
    type: DataTypes.BOOLEAN,
  },
  adecuaciones: {
    type: DataTypes.BOOLEAN,
  },
  mantenimiento: {
    type: DataTypes.BOOLEAN,
  },
  proyectoSustentable: {
    field: 'codigo_sustentable',
    type: DataTypes.BOOLEAN,
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

class TipoDeProyecto extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: TIPO_DE_PROYECTO_TABLE,
      modelName: 'TipoDeProyecto',
      timespamps: false,
    };
  }
}

module.exports = {
  TIPO_DE_PROYECTO_TABLE,
  TipoDeProyectoSchema,
  TipoDeProyecto,
};
