const { Model, DataTypes, Sequelize } = require('sequelize');
const { INSPECCIONES_TABLE } = require('./inspecciones');
const { INSPECCIONES_APARTADOS_TABLE } = require('./inspeccionApartado');

const INSPECCIONES_OBSERVACIONES_TABLE = 'inspeccion_observaciones';

const InspeccionObservacionesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  programaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'inspeccion_id',
    references: {
      model: INSPECCIONES_TABLE,
      key: 'id',
    },
  },
  estatus_inspeccionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'inspeccion_apartado_id',
    references: {
      model: INSPECCIONES_APARTADOS_TABLE,
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

class Observaciones extends Model {
  static associate(models) {
    this.belongsTo(models.Inspecciones, { as: 'inspecciones' });
    this.belongsTo(models.inspeccionesapartados, { as: 'inspeccionesapartados', foreignKey: 'inspeccionesapartadosId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCIONES_OBSERVACIONES_TABLE,
      modelName: 'inspeccion_observaciones',
      timestamps: false,
    };
  }
}

module.exports = {
  INSPECCIONES_OBSERVACIONES_TABLE,
  InspeccionObservacionesSchema,
  Observaciones,
};
