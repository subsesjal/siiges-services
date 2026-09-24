const { Model, DataTypes, Sequelize } = require('sequelize');

const USUARIO_BENEFICIARIO_BECA_TABLE = 'usuarios_beneficiarios_becas';

const UsuarioBeneficiarioBecaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  correo: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  procedencia: {
    allowNull: false,
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

class UsuarioBeneficiarioBeca extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: USUARIO_BENEFICIARIO_BECA_TABLE,
      modelName: 'UsuarioBeneficiarioBeca',
      timestamps: false,
    };
  }
}

module.exports = {
  USUARIO_BENEFICIARIO_BECA_TABLE,
  UsuarioBeneficiarioBecaSchema,
  UsuarioBeneficiarioBeca,
};
