'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ArticleCommentStaticField', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      commentId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'ArticleComment',
          key: 'id'
        }
      },
      staticFieldId: {
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'StaticField',
          key: 'id'
        }
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
    await queryInterface.dropTable('ArticleCommentStaticField')
  }
}
