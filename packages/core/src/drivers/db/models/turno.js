const { Model, DataTypes, Sequelize } = require('sequelize');

const TURNO_TABLE = 'turnos';

const TurnoSchema = {
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

class Turno extends Model {
  static associate(models) {
    this.hasMany(models.ProgramaTurno, { as: 'programaTurnos', foreignKey: 'turnoId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TURNO_TABLE,
      modelName: 'Turno',
      timestamps: false,
    };
  }
}

module.exports = { TURNO_TABLE, TurnoSchema, Turno };
