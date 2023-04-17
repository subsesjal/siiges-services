const { Model, DataTypes, Sequelize } = require('sequelize');

const ESTATUS_INSPECCION_TABLE = 'estatus';

const estatusSchema = {
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

class estatus extends Model {
  static associate(models) {
    this.hasMany(models.estatus_inspeccion, { as: 'estatus', foreignKey: 'estatusId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ESTATUS_INSPECCION_TABLE,
      modelName: 'estatus_inspeccion',
      timestamps: false,
    };
  }
}

module.exports = { ESTATUS_INSPECCION_TABLE, estatusSchema, estatus };
