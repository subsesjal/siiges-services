const { Model, DataTypes, Sequelize } = require('sequelize');
const { ALUMNO_TABLE } = require('./alumno');
const { TITULO_ELECTRONICO_TABLE } = require('./titulosElectronicos');

const ALUMNO_TITULO_ELECTRONICO_TABLE = 'alumnos_titulos_electronicos';

const AlumnoTituloElectronicoSchema = {
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
  tituloElectronicoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'titulo_electronico_id',
    references: {
      model: TITULO_ELECTRONICO_TABLE,
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

class AlumnoTituloElectronico extends Model {
  static associate(models) {
    this.belongsTo(models.Alumno, { as: 'alumno', foreignKey: 'alumnoId' });
    this.belongsTo(models.TituloElectronico, { as: 'tituloElectronico', foreignKey: 'tituloElectronicoId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ALUMNO_TITULO_ELECTRONICO_TABLE,
      modelName: 'AlumnoTituloElectronico',
      timestamps: false,
    };
  }
}

module.exports = {
  ALUMNO_TITULO_ELECTRONICO_TABLE,
  AlumnoTituloElectronicoSchema,
  AlumnoTituloElectronico,
};
