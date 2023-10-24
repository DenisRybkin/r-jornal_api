'use strict'

const constraintName = 'constraint_unique_articleId_categoryId'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ArticleCategory', {
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
      categoryId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Category',
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
    await queryInterface.addConstraint('ArticleCategory', {
      type: 'unique',
      fields: ['articleId', 'categoryId'],
      name: constraintName
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('ArticleCategory', constraintName)
    await queryInterface.dropTable('ArticleCategory')
  }
}
