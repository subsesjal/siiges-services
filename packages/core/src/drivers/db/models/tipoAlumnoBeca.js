const { Model, DataTypes, Sequelize } = require('sequelize');

const TIPO_ALUMNO_BECA_TABLE = 'tipo_alumnos_becas';

const TipoAlumnoBecaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  descripcion: {
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

class TipoAlumnoBeca extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TIPO_ALUMNO_BECA_TABLE,
      modelName: 'TipoAlumnoBeca',
      timestamps: false,
    };
  }
}

module.exports = { TIPO_ALUMNO_BECA_TABLE, TipoAlumnoBecaSchema, TipoAlumnoBeca };
