const { Model, DataTypes, Sequelize } = require('sequelize');
const { VIGILANCIA_TABLE } = require('./vigilancia');
const { VIGILANCIA_PREGUNTA_TABLE } = require('./vigilanciaPregunta');

const VIGILANCIA_VIGILANCIA_PREGUNTA_TABLE = 'Vigilanciaes_Vigilancia_preguntas';

const VigilanciaVigilanciaPreguntaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  vigilanciaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'vigilancia_id',
    references: {
      model: VIGILANCIA_TABLE,
      key: 'id',
    },
  },
  vigilanciaPreguntaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'vigilancia_pregunta_id',
    references: {
      model: VIGILANCIA_PREGUNTA_TABLE,
      key: 'id',
    },
  },
  respuesta: {
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

class VigilanciaVigilanciaPregunta extends Model {
  static associate(models) {
    this.belongsTo(models.Vigilancia, { as: 'vigilancia' });
    this.belongsTo(models.VigilanciaPregunta, { as: 'vigilanciaPregunta' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VIGILANCIA_VIGILANCIA_PREGUNTA_TABLE,
      modelName: 'VigilanciaVigilanciaPregunta',
      timestamps: false,
    };
  }
}

module.exports = {
  VIGILANCIA_VIGILANCIA_PREGUNTA_TABLE,
  VigilanciaVigilanciaPreguntaSchema,
  VigilanciaVigilanciaPregunta,
};
