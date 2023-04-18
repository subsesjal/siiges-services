const { Model, DataTypes, Sequelize } = require('sequelize');
const { INSPECCION_TABLE } = require('./inspecciones');
const { INSPECCIONES_APARTADOS_TABLE } = require('./inspeccionApartado');

const INSPECCIONES_OBSERVACIONES_TABLE = 'inspeccion_observaciones';

const inspeccionesObservacionesSchema = {
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
      model: INSPECCION_TABLE,
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

class inspeccionesObservaciones extends Model {
  static associate(models) {
    this.belongsTo(models.Inspecciones, { as: 'inspecciones' });
    this.belongsTo(models.inspecciones_apartados, { as: 'inspeccion_apartado', foreignKey: 'inspeccion_apartado_Id' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSPECCIONES_OBSERVACIONES_TABLE,
      modelName: 'Inspecciones_Observaciones',
      timestamps: false,
    };
  }
}

module.exports = {
  INSPECCIONES_OBSERVACIONES_TABLE,
  inspeccionesObservacionesSchema,
  inspeccionesObservaciones,
};
