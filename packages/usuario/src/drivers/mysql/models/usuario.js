const { Model, DataTypes, Sequelize } = require('sequelize');

const { PERSONAS_TABLE } = require('./personas.models');
const { ROLES_TABLE } = require('./roles.models');

const USUARIOS_TABLE = 'usuario';

const usuariosSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	personaId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: 'persona_id',
		references: {
			model: PERSONAS_TABLE,
			key: 'id',
		},
		/* onUpdate: 'CASCADE',
		onDelete: 'SET NULL', */
	},
	rolId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: 'rol_id',
		references: {
			model: ROLES_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
	usuario: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	contrasena: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	estatus: {
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	tokenNotificaciones: {
		allowNull: true,
		type: DataTypes.STRING,
		field: 'token_notificaciones',
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: 'created_at',
	},
	updatedAt: {
		allowNull: true,
		type: DataTypes.DATE,
		field: 'updated_at',
	},
	deletedAt: {
		allowNull: true,
		type: DataTypes.DATE,
		field: 'deleted_at',
	},
};

class usuarios extends Model {
	static associate(models) {
		this.belongsTo(models.persona, { as: 'persona' });
		this.belongsTo(models.rol, { as: 'rol' });
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: USUARIOS_TABLE,
			modelName: 'usuarios',
			timestamps: false,
		};
	}
}

module.exports = {USUARIOS_TABLE, usuariosSchema, }
