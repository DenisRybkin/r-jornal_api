'use strict'

const constraintName = 'constraint_unique_articleId_id'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ArticleTest', {
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
    await queryInterface.addConstraint('ArticleTest', {
      type: 'unique',
      fields: ['articleId', 'id'],
      name: constraintName
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('ArticleTest', constraintName)
    await queryInterface.dropTable('ArticleTest')
  }
}
