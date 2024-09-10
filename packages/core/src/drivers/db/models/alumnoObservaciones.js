const { Model, DataTypes, Sequelize } = require('sequelize');
const { ALUMNO_TABLE } = require('./alumno');
const { USUARIO_TABLE } = require('./usuario');

const ALUMNO_OBSERVACION_TABLE = 'alumno_observaciones';

const AlumnoObservacionSchema = {
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
  usuarioId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'usuario_id',
    references: {
      model: USUARIO_TABLE,
      key: 'id',
    },
  },
  observacion: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  etapa: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  fecha: {
    allowNull: false,
    type: DataTypes.DATEONLY,
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

class AlumnoObservacion extends Model {
  static associate(models) {
    this.belongsTo(models.Alumno, { as: 'alumno' });
    this.belongsTo(models.Usuario, { as: 'usuario' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ALUMNO_OBSERVACION_TABLE,
      modelName: 'AlumnoObservacion',
      timestamps: false,
    };
  }
}

module.exports = { ALUMNO_OBSERVACION_TABLE, AlumnoObservacionSchema, AlumnoObservacion };
