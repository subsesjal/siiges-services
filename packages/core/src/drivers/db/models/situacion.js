const { Model, DataTypes, Sequelize } = require('sequelize');

const SITUACION_TABLE = 'situaciones';

const SituacionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  descripcion: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  letra: {
    allowNull: false,
    type: DataTypes.CHAR(1),
    unique: true,
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

class Situacion extends Model {
  static associate(models) {
    this.hasOne(models.Alumno, {
      as: 'alumno',
      foreignKey: 'situacionId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SITUACION_TABLE,
      modelName: 'Situacion',
      timestamps: false,
    };
  }
}

module.exports = { SITUACION_TABLE, SituacionSchema, Situacion };
