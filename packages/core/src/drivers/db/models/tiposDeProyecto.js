const { Model, DataTypes, Sequelize } = require('sequelize');
const { DATO_DEL_PROYECTO_TABLE } = require('./datosDelProyecto');

const TIPO_DE_PROYECTO_TABLE = 'tipoDeProyecto';

const TipoDeProyectoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  DatosDelProyectoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'datos_del_proyecto_id',
    references: {
      model: DATO_DEL_PROYECTO_TABLE,
      key: 'id',
    },
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
  static associate(models) {
    this.belongsTo(models.DatosDelProyecto, { as: 'DatosDelProyecto' });
  }

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
