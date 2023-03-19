const { Model, DataTypes, Sequelize } = require('sequelize');
const { ASIGNATURA_TABLE } = require('./asignatura');
const { DOCENTE_TABLE } = require('./docente');

const ASIGNATURA_DOCENTE_TABLE = 'asignaturas_docentes';

const AsignaturaDocenteSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  asignaturaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'asignatura_id',
    references: {
      model: ASIGNATURA_TABLE,
      key: 'id',
    },
  },
  docenteId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'docente_id',
    references: {
      model: DOCENTE_TABLE,
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

class AsignaturaDocente extends Model {
  static associate(models) {
    this.belongsTo(models.Asignatura, { as: 'asignatura' });
    this.belongsTo(models.Docente, { as: 'docente' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ASIGNATURA_DOCENTE_TABLE,
      modelName: 'AsignaturaDocente',
      timestamps: false,
    };
  }
}

module.exports = { ASIGNATURA_DOCENTE_TABLE, AsignaturaDocenteSchema, AsignaturaDocente };
