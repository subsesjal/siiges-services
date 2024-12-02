const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROGRAMA_TABLE } = require('./programa');
const { ESTATUS_SOLICITUD_BECA_TABLE } = require('./estatusSolicitudBeca');

const SOLICITUD_BECA_TABLE = 'solicitudes_becas';

const SolicitudBecaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  estatusSolicitudBecaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'estatus_solicitud_beca_id',
    references: {
      model: ESTATUS_SOLICITUD_BECA_TABLE,
      key: 'id',
    },
  },
  programaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'programa_id',
    references: {
      model: PROGRAMA_TABLE,
      key: 'id',
    },
  },
  fecha: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  folioSolicitud: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'folio_solicitud',
  },
  observaciones: {
    allowNull: true,
    type: DataTypes.TEXT,
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

class SolicitudBeca extends Model {
  static associate(models) {
    this.belongsTo(models.EstatusSolicitudBeca, { as: 'estatusSolicitudBeca' });
    this.belongsTo(models.Programa, { as: 'programa' });
    this.hasMany(models.SolicitudBecaAlumno, { as: 'solicitudBecaAlumnos', foreignKey: 'solicitudBecaId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOLICITUD_BECA_TABLE,
      modelName: 'SolicitudBeca',
      timestamps: false,
    };
  }
}

module.exports = { SOLICITUD_BECA_TABLE, SolicitudBecaSchema, SolicitudBeca };
