'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('StaticField', [
      {
        id: 1,
        name: '29e80db2-70ce-4bb2-b039-cabb5f067254.webp',
        originalname: 'EUOV1Jc-3ik.jpg',
        url: 'https://it-hub.storage.yandexcloud.net/uploads/29e80db2-70ce-4bb2-b039-cabb5f067254.webp',
        type: 'image/jpeg',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('StaticField', null)
  }
}
