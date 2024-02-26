'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('UserAchievement', [
      { userId: 1, categoryId: 1, achievementId: 1 },
      { userId: 1, categoryId: 2, achievementId: 1 },
      { userId: 1, categoryId: 3, achievementId: 1 },
      { userId: 1, categoryId: 4, achievementId: 1 },
      { userId: 1, categoryId: 5, achievementId: 1 },
      { userId: 1, categoryId: 6, achievementId: 1 },
      { userId: 1, categoryId: 7, achievementId: 1 },
      { userId: 1, categoryId: 8, achievementId: 1 },
      { userId: 1, categoryId: 9, achievementId: 1 },
      { userId: 1, categoryId: 10, achievementId: 1 },
      { userId: 1, categoryId: 11, achievementId: 1 },
      { userId: 1, categoryId: 12, achievementId: 1 },
      { userId: 1, categoryId: 13, achievementId: 1 },
      { userId: 1, categoryId: 14, achievementId: 1 },
      { userId: 1, categoryId: 15, achievementId: 1 },
      { userId: 1, categoryId: 16, achievementId: 1 },
      { userId: 1, categoryId: 17, achievementId: 1 },
      { userId: 1, categoryId: 18, achievementId: 1 }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('UserAchievement', null)
  }
}
