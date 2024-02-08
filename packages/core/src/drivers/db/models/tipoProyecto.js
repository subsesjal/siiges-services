const { Model, DataTypes, Sequelize } = require('sequelize');

const TIPO_PROYECTO_TABLE = 'tipo_proyectos';

const TipoProyectoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.STRING,
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
  static associate(models) {
    this.hasMany(models.ProyectoTipoProyecto, { as: 'proyectoTipoProyecto', foreignKey: 'tipoProyectoId' });
  }

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
