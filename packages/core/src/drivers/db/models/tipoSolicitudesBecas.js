const { Model, DataTypes, Sequelize } = require('sequelize');
const TIPO_SOLICITUD_BECA_TABLE = 'tipo_solicitud_beca';


const TipoSolicitudBecaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'nombre',
  },
  descripcion: { 
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'descripcion',
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

class TipoSolicitudBeca extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TIPO_SOLICITUD_BECA_TABLE,
      modelName: 'TipoSolicitudeBeca',
      timestamps: false,
    };
  };
};
module.exports = { TIPO_SOLICITUD_BECA_TABLE, TipoSolicitudBecaSchema, TipoSolicitudBeca }