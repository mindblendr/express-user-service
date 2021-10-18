'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Admin extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Admin.belongsTo(models.Login, { foreignKey: 'login_id' });
		}
	};
	Admin.init({
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.BIGINT
		},
		login_id: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		firstname: {
			type: DataTypes.STRING
		},
		lastname: {
			type: DataTypes.STRING
		},
		role: {
			type: DataTypes.STRING
		},
		created_at: {
			allowNull: false,
			type: DataTypes.DATE
		},
		updated_at: {
			allowNull: false,
			type: DataTypes.DATE
		},
		deleted_at: {
			type: DataTypes.DATE
		}
	}, {
		sequelize,
		modelName: 'Admin',
		tableName: 'admin',
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		deletedAt: 'deleted_at',
		freezeTableName: true,
		paranoid: true,
	});
	return Admin;
};