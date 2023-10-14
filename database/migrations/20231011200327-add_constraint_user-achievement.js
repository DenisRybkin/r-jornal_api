'use strict'

const constraintName = 'constraint_unique_userId_categoryId_achievementId'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('UserAchievement', {
      type: 'unique',
      fields: ['userId', 'categoryId', 'achievementId'],
      name: constraintName
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('UserAchievement', constraintName)
  }
}
