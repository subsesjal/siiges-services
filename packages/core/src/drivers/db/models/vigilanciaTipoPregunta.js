const { Model, DataTypes, Sequelize } = require('sequelize');

const VIGILANCIA_TIPO_PREGUNTA_TABLE = 'Vigilancia_tipo_preguntas';

const VigilanciaTipoPreguntaSchema = {
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

class VigilanciaTipoPregunta extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VIGILANCIA_TIPO_PREGUNTA_TABLE,
      modelName: 'VigilanciaTipoPregunta',
      timestamps: false,
    };
  }
}

module.exports = {
  VIGILANCIA_TIPO_PREGUNTA_TABLE,
  VigilanciaTipoPreguntaSchema,
  VigilanciaTipoPregunta,
};
