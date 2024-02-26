'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('ExaminationAnswer', [
      {
        id: 1,
        name: '512',
        questionId: 1,
        isRight: false
      },
      {
        id: 2,
        name: '1024',
        questionId: 1,
        isRight: true
      },
      {
        id: 3,
        name: '2048',
        questionId: 1,
        isRight: false
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('ExaminationAnswer', null)
  }
}
