const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROGRAMA_TABLE } = require('./programa');
const { ESTATUS_VIGILANCIA_TABLE } = require('./estatusVigilancia');

const VIGILANCIA_TABLE = 'vigilancias';

const VigilanciaSchema = {
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
  estatusVigilanciaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'estatus_vigilancia_id',
    references: {
      model: ESTATUS_VIGILANCIA_TABLE,
      key: 'id',
    },
  },
  fecha: {
    type: DataTypes.DATE,
  },
  fechaAsignada: {
    type: DataTypes.DATE,
    field: 'fecha_asignada',
  },
  resultado: {
    type: DataTypes.STRING,
  },
  folio: {
    type: DataTypes.STRING,
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

class Vigilancia extends Model {
  static associate(models) {
    this.belongsTo(models.Programa, { as: 'programa' });
    this.belongsTo(models.EstatusVigilancia, { as: 'estatusVigilancia' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VIGILANCIA_TABLE,
      modelName: 'Vigilancia',
      timestamps: false,
    };
  }
}

module.exports = { VIGILANCIA_TABLE, VigilanciaSchema, Vigilancia };
