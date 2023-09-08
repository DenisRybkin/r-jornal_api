'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CategoryAvatar', [
      {
        id: 1,
        categoryId: 1,
        staticFieldId: 20
      },
      {
        id: 2,
        categoryId: 2,
        staticFieldId: 21
      },
      {
        id: 3,
        categoryId: 3,
        staticFieldId: 22
      },
      {
        id: 4,
        categoryId: 4,
        staticFieldId: 23
      },
      {
        id: 5,
        categoryId: 5,
        staticFieldId: 25
      },
      {
        id: 6,
        categoryId: 6,
        staticFieldId: 26
      },
      {
        id: 7,
        categoryId: 7,
        staticFieldId: 27
      },
      {
        id: 8,
        categoryId: 8,
        staticFieldId: 28
      },
      {
        id: 9,
        categoryId: 9,
        staticFieldId: 29
      },
      {
        id: 10,
        categoryId: 10,
        staticFieldId: 30
      },
      {
        id: 11,
        categoryId: 11,
        staticFieldId: 31
      },
      {
        id: 12,
        categoryId: 12,
        staticFieldId: 32
      },
      {
        id: 13,
        categoryId: 13,
        staticFieldId: 33
      },
      {
        id: 14,
        categoryId: 14,
        staticFieldId: 34
      },
      {
        id: 15,
        categoryId: 15,
        staticFieldId: 35
      },
      {
        id: 16,
        categoryId: 16,
        staticFieldId: 36
      },
      {
        id: 17,
        categoryId: 17,
        staticFieldId: 37
      },
      {
        id: 18,
        categoryId: 18,
        staticFieldId: 38
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CategoryAvatar', null)
  }
}
