const { Model, DataTypes, Sequelize } = require('sequelize');

const INSPECCIONES_TIPO_PREGUNTAS_TABLE = 'inspeccionesTipoPreguntas';

const inspeccionesTipoPreguntasSchema = {
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

class inspeccionTipoPreguntas extends Model {
  static associate(models) {
    this.hasMany(models.inspeccionesTipoPreguntas, { as: 'inspeccionesTipopreguntas', foreignKey: 'inspeccionesTipoPreguntasId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCIONES_TIPO_PREGUNTAS_TABLE,
      modelName: 'inspeccionesTipoPreguntasSchema',
      timestamps: false,
    };
  }
}

module.exports = {
  INSPECCIONES_TIPO_PREGUNTAS_TABLE,
  inspeccionesTipoPreguntasSchema,
  inspeccionTipoPreguntas,
};
