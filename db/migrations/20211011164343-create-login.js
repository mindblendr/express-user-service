'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('login', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT
			},
			username: {
				type: Sequelize.STRING,
				unique: true
			},
			password: {
				type: Sequelize.STRING
			},
			user_type: {
				type: Sequelize.STRING(10)
			},
			status: {
				type: Sequelize.BOOLEAN
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			deleted_at: {
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('login');
	}
};