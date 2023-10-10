'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserCategory', [
      {
        id: 1,
        categoryId: 2,
        userId: 1
      },
      {
        id: 2,
        categoryId: 3,
        userId: 1
      },
      {
        id: 3,
        categoryId: 4,
        userId: 1
      },
      {
        id: 4,
        categoryId: 5,
        userId: 1
      },
      {
        id: 5,
        categoryId: 6,
        userId: 1
      },
      {
        id: 6,
        categoryId: 7,
        userId: 1
      },
      {
        id: 7,
        categoryId: 8,
        userId: 1
      },
      {
        id: 8,
        categoryId: 9,
        userId: 1
      },
      {
        id: 9,
        categoryId: 10,
        userId: 1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserCategory', null)
  }
}
