const { Model, DataTypes, Sequelize } = require('sequelize');
const { VIGILANCIA_TABLE } = require('./vigilancia');
const { VIGILANCIA_CATEGORIA_TABLE } = require('./vigilanciaCategoria');

const VIGILANCIA_OBSERVACION_TABLE = 'vigilancia_observaciones';

const VigilanciaObservacionSchema = {
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
  vigilanciaApartadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'vigilancia_apartado_id',
    references: {
      model: VIGILANCIA_CATEGORIA_TABLE,
      key: 'id',
    },
  },
  comentario: {
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

class VigilanciaObservacion extends Model {
  static associate(models) {
    this.belongsTo(models.Vigilancia, { as: 'vigilancia' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VIGILANCIA_OBSERVACION_TABLE,
      modelName: 'VigilanciaObservacion',
      timestamps: false,
    };
  }
}

module.exports = {
  VIGILANCIA_OBSERVACION_TABLE,
  VigilanciaObservacionSchema,
  VigilanciaObservacion,
};
