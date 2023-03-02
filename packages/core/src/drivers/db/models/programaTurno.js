const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROGRAMA_TABLE } = require('./programa');
const { TURNO_TABLE } = require('./turno');

const PROGRAMA_TURNO_TABLE = 'programas_turnos';

const ProgramaTurnoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  programaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'programa_id',
    references: {
      model: PROGRAMA_TABLE,
      key: 'id',
    },
  },
  turnoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'turno_id',
    references: {
      model: TURNO_TABLE,
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

class ProgramaTurno extends Model {
  static associate(models) {
    this.belongsTo(models.Programa, { as: 'programa' });
    this.belongsTo(models.Turno, { as: 'turno' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROGRAMA_TURNO_TABLE,
      modelName: 'ProgramaTurno',
      timestamps: false,
    };
  }
}

module.exports = { PROGRAMA_TURNO_TABLE, ProgramaTurnoSchema, ProgramaTurno };
