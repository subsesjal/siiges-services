const { Model, DataTypes, Sequelize } = require('sequelize');

const ESTATUS_SOLICITUD_FOLIO_TABLE = 'estatus_solicitudes_folios';

const EstatusSolicitudFolioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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

class EstatusSolicitudFolio extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ESTATUS_SOLICITUD_FOLIO_TABLE,
      modelName: 'EstatusSolicitudFolio',
      timestamps: false,
    };
  }
}
module.exports = {
  ESTATUS_SOLICITUD_FOLIO_TABLE,
  EstatusSolicitudFolioSchema,
  EstatusSolicitudFolio,
};
