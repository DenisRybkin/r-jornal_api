'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Article', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      body: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT
      },
      createdByUserId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        },
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Article')
  }
}
