'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('ExaminationQuestion', [
      {
        id: 1,
        name: 'How many bits are in one kilobyte?',
        examinationId: 1
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('ExaminationQuestion', null)
  }
}
