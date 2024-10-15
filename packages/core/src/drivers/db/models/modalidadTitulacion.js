const { Model, DataTypes, Sequelize } = require('sequelize');
const { TIPO_MODALIDAD_TABLE } = require('./tipoModalidad');

const MODALIDAD_TITULACION_TABLE = 'modalidades_titulacion';

const ModalidadTitulacionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  tipoModalidadId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_modalidad_id',
    references: {
      model: TIPO_MODALIDAD_TABLE,
      key: 'id',
    },
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
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

class ModalidadTitulacion extends Model {
  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MODALIDAD_TITULACION_TABLE,
      modelName: 'ModalidadTitulacion',
      timestamps: false,
    };
  }
}
module.exports = { MODALIDAD_TITULACION_TABLE, ModalidadTitulacionSchema, ModalidadTitulacion };
