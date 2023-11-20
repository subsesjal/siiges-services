const { Model, DataTypes, Sequelize } = require('sequelize');

const ESTATUS_VIGILANCIA_TABLE = 'estatus_vigilancias';

const EstatusVigilanciaSchema = {
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

class EstatusVigilancia extends Model {
  static associate() {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ESTATUS_VIGILANCIA_TABLE,
      modelName: 'EstatusVigilancia',
      timestamps: false,
    };
  }
}

module.exports = { ESTATUS_VIGILANCIA_TABLE, EstatusVigilanciaSchema, EstatusVigilancia };
