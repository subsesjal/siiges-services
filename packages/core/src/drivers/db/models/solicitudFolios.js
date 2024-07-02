const { Model, DataTypes, Sequelize } = require('sequelize');
const { TIPO_CERTIFICADO_TABLE } = require('./tipoCertificado');
const { PROGRAMA_TABLE } = require('./programa');

const SOLICITUD_FOLIOS_TABLE = 'solicitud_folios';

const SolicitudFoliosSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  programaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'solicitud_folios_id',
    references: {
      model: PROGRAMA_TABLE,
      key: 'id',
    },
  },
  tipoCertificadoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'solicitud_folios_id',
    references: {
      model: TIPO_CERTIFICADO_TABLE,
      key: 'id',
    },
  },
  correo: {
    type: DataTypes.STRING,
  },
  fechaSolicitud: {
    type: DataTypes.DATE,
  },
  folioPago: {
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

class SolicitudFolios extends Model {
  static associate(models) {
    this.belongsTo(models.TipoCertificado, { as: 'tipoCertificado' });
    this.belongsTo(models.Programa, { as: 'programa' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOLICITUD_FOLIOS_TABLE,
      modelName: 'SolicitudFolios',
      timestamps: false,
    };
  }
}

module.exports = {
  SOLICITUD_FOLIOS_TABLE,
  SolicitudFoliosSchema,
  SolicitudFolios,
};
