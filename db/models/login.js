'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Login extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};
	Login.init({
		username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		user_type: {
			type: DataTypes.STRING(10)
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		deleted_at: {
			type: DataTypes.DATE
		}
	}, {
		sequelize,
		modelName: 'Login',
		tableName: 'login',
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		deletedAt: 'deleted_at',
		freezeTableName: true,
		paranoid: true,
	});
	return Login;
};