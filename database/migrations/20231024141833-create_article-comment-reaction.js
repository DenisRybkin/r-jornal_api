'use strict'

const constraintName = 'constraint_unique_commentId_userId_value'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ArticleCommentReaction', {
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
      userId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id'
        }
      },
      value: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
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
    await queryInterface.addConstraint('ArticleCommentReaction', {
      type: 'unique',
      fields: ['commentId', 'userId', 'value'],
      name: constraintName
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'ArticleCommentReaction',
      constraintName
    )
    await queryInterface.dropTable('ArticleCommentReaction')
  }
}
