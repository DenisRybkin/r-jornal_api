'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [
      {
        id: 1,
        nickname: 'fishhher',
        name: 'Denis',
        email: 'rybkin.denis.94@gmail.com',
        password:
          '$2a$05$xqY4CUGu7DaJaELkmunOe.b4cJpSuzsAP3vSlusbU/Fg58c4Rtfgq',
        roleId: 3
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null)
  }
}
