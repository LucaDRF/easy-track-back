'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS citext;', { transaction });
      await queryInterface.createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          allowNull: false,
          type: Sequelize.DataTypes.STRING,
        },
        lastName: {
          allowNull: false,
          type: Sequelize.DataTypes.STRING,
        },
        age: {
          allowNull: false,
          type: Sequelize.DataTypes.INTEGER,
        },
        email: 'citext UNIQUE NOT NULL',
        password: {
          allowNull: false,
          type: Sequelize.DataTypes.STRING,
        },
        gender: {
          allowNull: false,
          type: Sequelize.DataTypes.STRING
        },
        createdAt: {
          type: Sequelize.DataTypes.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        isDeleted: {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: true
        }
      }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }

  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.sequelize.query('DROP EXTENSION citext;', { transaction });
      await queryInterface.dropTable('users', { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
