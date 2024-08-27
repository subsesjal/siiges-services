const { Model, DataTypes, Sequelize } = require('sequelize');
const { ALUMNO_TABLE } = require('./alumno');
const { SOLICITUD_FOLIO_TABLE } = require('./solicitudFolio');

const SOLICITUD_FOLIO_ALUMNO_TABLE = 'solicitudes_folios_alumnos';

const SolicitudFolioAlumnoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  alumnoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'alumno_id',
    references: {
      model: ALUMNO_TABLE,
      key: 'id',
    },
  },
  solicitudFolioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'solicitud_folio_id',
    references: {
      model: SOLICITUD_FOLIO_TABLE,
      key: 'id',
    },
  },
  fechaTermino: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_termino',
  },
  fechaElaboracion: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_elaboracion',
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

class SolicitudFolioAlumno extends Model {
  static associate(models) {
    this.belongsTo(models.Alumno, { as: 'alumno' });
    this.belongsTo(models.SolicitudFolio, { as: 'solicitudFolio' });
    this.hasOne(models.FolioDocumentoAlumno, { as: 'folioDocumentoAlumno', foreignKey: 'solicitudFolioAlumnoId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOLICITUD_FOLIO_ALUMNO_TABLE,
      modelName: 'SolicitudFolioAlumno',
      timestamps: false,
    };
  }
}

module.exports = { SOLICITUD_FOLIO_ALUMNO_TABLE, SolicitudFolioAlumnoSchema, SolicitudFolioAlumno };
