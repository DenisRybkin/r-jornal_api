'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ArticleStaticField', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      articleId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Article',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      staticFieldId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'StaticField',
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
    await queryInterface.dropTable('ArticleStaticField')
  }
}
