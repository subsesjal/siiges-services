const { Model, DataTypes, Sequelize } = require('sequelize');

const INSPECCION_TIPOS_PREGUNTAS_TABLE = 'tipos_preguntas';

const tipopreguntasSchema = {
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

class tipopreguntas extends Model {
  static associate(models) {
    this.hasMany(models.inspeccion_tipo_preguntas, { as: 'tipopreguntas', foreignKey: 'tipos_preguntasId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCION_TIPOS_PREGUNTAS_TABLE,
      modelName: 'inspeccion_tipo_preguntas',
      timestamps: false,
    };
  }
}

module.exports = { INSPECCION_TIPOS_PREGUNTAS_TABLE, tipopreguntasSchema, tipopreguntas };
