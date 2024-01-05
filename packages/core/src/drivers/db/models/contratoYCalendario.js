const { Model, DataTypes, Sequelize } = require('sequelize');
const { DATO_DEL_PROYECTO_TABLE } = require('./datosDelProyecto');

const CONTRATO_Y_CALENDARIO_TABLE = 'contratos_y_calendarios';

const ContratoYCalendarioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  DatosDelProyectoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'datos_del_proyecto_id',
    references: {
      model: DATO_DEL_PROYECTO_TABLE,
      key: 'id',
    },
  },
  numeroDeContrato: {
    type: DataTypes.STRING,
    field: 'numero_de_contrato',
  },
  fechaInicio: {
    field: 'fecha_inicio',
    type: DataTypes.DATE,
  },
  fechaFin: {
    field: 'fecha_fin',
    type: DataTypes.DATE,
  },
  contratista: {
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

class ContratoYCalendario extends Model {
  static associate(models) {
    this.belongsTo(models.DatosDelProyecto, { as: 'DatosDelProyecto' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CONTRATO_Y_CALENDARIO_TABLE,
      modelName: 'ContratoYCalendario',
      timestamps: false,
    };
  }
}

module.exports = {
  CONTRATO_Y_CALENDARIO_TABLE,
  ContratoYCalendarioSchema,
  ContratoYCalendario,
};
