'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('CategoryAvatar', [
      {
        id: 1,
        categoryId: 1,
        staticFieldId: 32
      },
      {
        id: 2,
        categoryId: 2,
        staticFieldId: 33
      },
      {
        id: 3,
        categoryId: 3,
        staticFieldId: 34
      },
      {
        id: 4,
        categoryId: 4,
        staticFieldId: 35
      },
      {
        id: 5,
        categoryId: 5,
        staticFieldId: 36
      },
      {
        id: 6,
        categoryId: 6,
        staticFieldId: 37
      },
      {
        id: 7,
        categoryId: 7,
        staticFieldId: 38
      },
      {
        id: 8,
        categoryId: 8,
        staticFieldId: 39
      },
      {
        id: 9,
        categoryId: 9,
        staticFieldId: 40
      },
      {
        id: 10,
        categoryId: 10,
        staticFieldId: 41
      },
      {
        id: 11,
        categoryId: 11,
        staticFieldId: 42
      },
      {
        id: 12,
        categoryId: 12,
        staticFieldId: 43
      },
      {
        id: 13,
        categoryId: 13,
        staticFieldId: 44
      },
      {
        id: 14,
        categoryId: 14,
        staticFieldId: 45
      },
      {
        id: 15,
        categoryId: 15,
        staticFieldId: 46
      },
      {
        id: 16,
        categoryId: 16,
        staticFieldId: 47
      },
      {
        id: 17,
        categoryId: 17,
        staticFieldId: 48
      },
      {
        id: 18,
        categoryId: 18,
        staticFieldId: 49
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('CategoryAvatar', null)
  }
}
