const { Model, DataTypes, Sequelize } = require('sequelize');
const { INSTITUCION_TABLE } = require('./institucion');

const RATIFICACION_NOMBRE_TABLE = 'ratificacion_nombres';

const RatificacionNombreSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  institucionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'institucion_id',
    references: {
      model: INSTITUCION_TABLE,
      key: 'id',
    },
  },
  autoridad: {
    type: DataTypes.STRING,
  },
  nombrePropuesto1: {
    type: DataTypes.STRING,
    field: 'nombre_propuesto1',
  },
  nombrePropuesto2: {
    type: DataTypes.STRING,
    field: 'nombre_propuesto2',
  },
  nombrePropuesto3: {
    type: DataTypes.STRING,
    field: 'nombre_propuesto3',
  },
  nombreSolicitado: {
    type: DataTypes.STRING,
    field: 'nombre_solicitado',
  },
  nombreAutorizado: {
    type: DataTypes.STRING,
    field: 'nombre_autorizado',
  },
  esNombreAutorizado: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'es_nombre_autorizado',
    defaultValue: false,
  },
  fechaAutorizacion: {
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

class RatificacionNombre extends Model {
  static associate(models) {
    this.belongsTo(models.Institucion, { as: 'institucion' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: RATIFICACION_NOMBRE_TABLE,
      modelName: 'RatificacionNombre',
      timestamps: false,
    };
  }
}
module.exports = { RATIFICACION_NOMBRE_TABLE, RatificacionNombreSchema, RatificacionNombre };
