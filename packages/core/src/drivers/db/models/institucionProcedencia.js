const { Model, DataTypes, Sequelize } = require('sequelize');
const { TIPO_INSTITUCION_TABLE } = require('./tipoInstitucion');
const { ESTADO_TABLE } = require('./estado');

const INSTITUCION_PROCEDENCIA_TABLE = 'instituciones_procedencia';

const InstitucionProcedenciaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  tipoInstitucionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_institucion_id',
    references: {
      model: TIPO_INSTITUCION_TABLE,
      key: 'id',
    },
  },
  nivelId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'nivel_id',
    references: {
      model: TIPO_INSTITUCION_TABLE,
      key: 'id',
    },
  },
  estadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'estado_id',
    references: {
      model: ESTADO_TABLE,
      key: 'id',
    },
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  nombreCarrera: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'nombre_carrera',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: null,
  },
  deletedAt: {
    type: DataTypes.DATE,
    field: 'deleted_at',
    defaultValue: null,
  },
};

class InstitucionProcedencia extends Model {
  static associate(models) {
    this.belongsTo(models.TipoInstitucion, { as: 'tipoInstitucion' });
    this.belongsTo(models.Estado, { as: 'estado' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: INSTITUCION_PROCEDENCIA_TABLE,
      modelName: 'InstitucionProcedencia',
      timestamps: false,
    };
  }
}

module.exports = {
  INSTITUCION_PROCEDENCIA_TABLE,
  InstitucionProcedenciaSchema,
  InstitucionProcedencia,
};
