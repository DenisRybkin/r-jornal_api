'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserAchievement', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id'
        }
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Category',
          key: 'id'
        }
      },
      achievementId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Achievement',
          key: 'id'
        }
      },
      userPoints: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserAchievement')
  }
}
