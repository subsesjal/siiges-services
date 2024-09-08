const { Model, DataTypes, Sequelize } = require('sequelize');
const { ALUMNO_TABLE } = require('./alumno');

const EQUIVALENCIA_TABLE = 'equivalencias';

const EquivalenciaSchema = {
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
  folioExpediente: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'folio_expediente',
  },
  archivoCertificadoParcial: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'archivo_certificado_parcial',
  },
  archivoResolucion: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'archivo_resolucion',
  },
  folioResolucion: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'folio_resolucion',
  },
  fechaResolucion: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'fecha_resolucion',
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

class Equivalencia extends Model {
  static associate(models) {
    this.belongsTo(models.Alumno, { as: 'alumno' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EQUIVALENCIA_TABLE,
      modelName: 'Equivalencia',
      timestamps: false,
    };
  }
}

module.exports = { EQUIVALENCIA_TABLE, EquivalenciaSchema, Equivalencia };
