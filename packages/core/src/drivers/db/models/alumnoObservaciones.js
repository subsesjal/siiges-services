const { Model, DataTypes, Sequelize } = require('sequelize');
const { ALUMNO_TABLE } = require('./alumno');
const { USUARIO_TABLE } = require('./usuario');

const ALUMNO_OBSERVACIONES_TABLE = 'alumno_observaciones';

const AlumnoObservacionesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  alumnoId: {
    field: 'alumno_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ALUMNO_TABLE,
      key: 'id',
    },
  },
  usuarioId: {
    field: 'usuario_id',
    allowNull: false,
    type: DataTypes.INTEGER,
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

class AlumnoObservaciones extends Model {
  static associate(models) {
    this.belongsTo(models.Alumno, { as: 'alumno' });
    this.belongsTo(models.Usuario, { as: 'usuario' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ALUMNO_OBSERVACIONES_TABLE,
      modelName: 'AlumnoObservaciones',
      timestamps: false,
    };
  }
}

module.exports = { ALUMNO_OBSERVACIONES_TABLE, AlumnoObservacionesSchema, AlumnoObservaciones };
