'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Role', [
      {
        id: 1,
        name: 'user',
        description: 'Default user'
      },
      {
        id: 2,
        name: 'admin',
        description: 'Administration of platform'
      },
      {
        id: 3,
        name: 'owner',
        description: 'Has all permissions'
      },
      {
        id: 4,
        name: 'publisher',
        description: 'Has permission to publish articles'
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Role', null)
  }
}
