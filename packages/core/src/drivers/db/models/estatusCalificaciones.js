const { Model, DataTypes, Sequelize } = require('sequelize');

const ESTATUS_CALIFICACION_TABLE = 'estatus_calificaciones';

const EstatusCalificacionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  estatus: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  descripcion: {
    allowNull: true,
    type: DataTypes.STRING,
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

class EstatusCalificacion extends Model {
  static associate() {
    // Define associations here if needed
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ESTATUS_CALIFICACION_TABLE,
      modelName: 'EstatusCalificacion',
      timestamps: false,
    };
  }
}

module.exports = { ESTATUS_CALIFICACION_TABLE, EstatusCalificacionSchema, EstatusCalificacion };
