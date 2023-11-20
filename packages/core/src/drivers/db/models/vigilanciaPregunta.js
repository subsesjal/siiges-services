const { Model, DataTypes, Sequelize } = require('sequelize');
const { VIGILANCIA_TIPO_PREGUNTA } = require('./vigilanciaTipoPregunta');
const { VIGILANCIA_APARTADO_TABLE } = require('./vigilanciaApartado');
const { VIGILANCIA_CATEGORIA_TABLE } = require('./vigilanciaCategoria');

const VIGILANCIA_PREGUNTA_TABLE = 'vigilancia_preguntas';

const VigilanciaPreguntaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  vigilanciaTipoPreguntaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'vigilancia_tipo_pregunta_id',
    references: {
      model: VIGILANCIA_TIPO_PREGUNTA,
      key: 'id',
    },
  },
  vigilanciaApartadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'Vigilancia_apartado_id',
    references: {
      model: VIGILANCIA_APARTADO_TABLE,
      key: 'id',
    },
  },
  VigilanciaCategoriaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'Vigilancia_categoria_id',
    references: {
      model: VIGILANCIA_CATEGORIA_TABLE,
      key: 'id',
    },
  },
  pregunta: {
    allowNull: false,
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

class VigilanciaPregunta extends Model {
  static associate(models) {
    this.belongsTo(models.VigilanciaTipoPregunta, { as: 'vigilanciaTipoPregunta' });
    this.belongsTo(models.VigilanciaApartado, { as: 'vigilanciaApartado' });
    this.belongsTo(models.VigilanciaCategoria, { as: 'vigilanciaCategoria' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VIGILANCIA_PREGUNTA_TABLE,
      modelName: 'VigilanciaPregunta',
      timestamps: false,
    };
  }
}

module.exports = { VIGILANCIA_PREGUNTA_TABLE, VigilanciaPreguntaSchema, VigilanciaPregunta };
