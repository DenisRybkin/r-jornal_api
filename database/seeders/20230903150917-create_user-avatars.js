'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('UserAvatar', [
      {
        id: 1,
        userId: 1,
        staticFieldId: 1
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('UserAvatar', null)
  }
}
