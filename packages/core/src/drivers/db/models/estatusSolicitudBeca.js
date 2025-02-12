const { Model, DataTypes, Sequelize } = require('sequelize');

const ESTATUS_SOLICITUD_BECA_TABLE = 'estatus_solicitud_beca';

const EstatusSolicitudBecaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  descripcion: {
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

class EstatusSolicitudBeca extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ESTATUS_SOLICITUD_BECA_TABLE,
      modelName: 'EstatusSolicitudBeca',
      timestamps: false,
    };
  }
}

module.exports = { ESTATUS_SOLICITUD_BECA_TABLE, EstatusSolicitudBecaSchema, EstatusSolicitudBeca };
