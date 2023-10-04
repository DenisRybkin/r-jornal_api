'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Examination', [
      {
        id: 1,
        title: 'General testing for knowledge of the IT',
        description:
          'Answer all the questions correctly to get the role of the publisher',
        certificateRoleId: 4
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Examination', null)
  }
}
