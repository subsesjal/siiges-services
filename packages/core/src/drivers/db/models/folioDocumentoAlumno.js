const { Model, DataTypes, Sequelize } = require('sequelize');
const { ALUMNO_TABLE } = require('./alumno');
const { FOJA_TABLE } = require('./foja');
const { LIBRO_TABLE } = require('./libro');
const { TIPO_DOCUMENTO_TABLE } = require('./tipoDocumento');

const FOLIO_DOCUMENTO_ALUMNO_TABLE = 'folios_documentos_alumnos';

const FolioDocumentoAlumnoSchema = {
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
  tipoDocumentoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'tipo_documento_id',
    references: {
      model: TIPO_DOCUMENTO_TABLE,
      key: 'id',
    },
  },
  fojaId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'foja_id',
    references: {
      model: FOJA_TABLE,
      key: 'id',
    },
  },
  libroId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'libro_id',
    references: {
      model: LIBRO_TABLE,
      key: 'id',
    },
  },
  folioDocumento: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'folio_documento',
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

class FolioDocumentoAlumno extends Model {
  static associate(models) {
    this.belongsTo(models.Alumno, { as: 'alumno' });
    this.belongsTo(models.SolicitudFolio, { as: 'solicitudFolio' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FOLIO_DOCUMENTO_ALUMNO_TABLE,
      modelName: 'FolioDocumentoAlumno',
      timestamps: false,
    };
  }
}

module.exports = { FOLIO_DOCUMENTO_ALUMNO_TABLE, FolioDocumentoAlumnoSchema, FolioDocumentoAlumno };
