const { Model, DataTypes, Sequelize } = require('sequelize');
const { ALUMNO_TABLE } = require('./alumno');
const { SOLICITUD_BECA_TABLE } = require('./solicitudBeca');

const SOLICITUD_BECA_ALUMNO_TABLE = 'solicitudes_becas_alumnos';

const SolicitudBecaAlumnoSchema = {
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
  solicitudBecaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'solicitud_beca_id',
    references: {
      model: SOLICITUD_BECA_TABLE,
      key: 'id',
    },
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

class SolicitudBecaAlumno extends Model {
  static associate(models) {
    this.belongsTo(models.Alumno, { as: 'alumno' });
    this.belongsTo(models.SolicitudBeca, { as: 'solicitudBeca' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SOLICITUD_BECA_ALUMNO_TABLE,
      modelName: 'SolicitudBecaAlumno',
      timestamps: false,
    };
  }
}

module.exports = { SOLICITUD_BECA_ALUMNO_TABLE, SolicitudBecaAlumnoSchema, SolicitudBecaAlumno };
