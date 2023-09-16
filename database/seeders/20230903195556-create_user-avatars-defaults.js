'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'StaticField',
      Array.from(Array(18).keys()).map((_, index) => ({
        id: index + 2,
        name: (index + 1).toString() + '.svg',
        originalname: (index + 1).toString() + '.svg',
        url: `https://it-hub.storage.yandexcloud.net/default-avatars/${
          (index + 1).toString() + '.svg'
        }`,
        type: 'image/svg',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      }))
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('StaticField')
  }
}
