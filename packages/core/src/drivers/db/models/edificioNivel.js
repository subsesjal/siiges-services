const { Model, DataTypes, Sequelize } = require('sequelize');

const EDIFICIO_NIVEL_TABLE = 'edificios_niveles';

const EdificioNivelSchema = {
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

class EdificioNivel extends Model {
  static associate(models) {
    this.hasMany(models.PlantelEdificioNivel, { as: 'plantelEdificiosNiveles', foreignKey: 'edificioNivelId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: EDIFICIO_NIVEL_TABLE,
      modelName: 'EdificioNivel',
      timestamps: false,
    };
  }
}

module.exports = { EDIFICIO_NIVEL_TABLE, EdificioNivelSchema, EdificioNivel };
