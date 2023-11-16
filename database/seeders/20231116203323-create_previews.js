'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'StaticField',
      Array.from(Array(9).keys()).map((_, index) => ({
        name: (index + 1).toString() + '.jpg',
        originalname: (index + 1).toString() + '.jpg',
        url: `https://storage.yandexcloud.net/it-hub/previews/${
          (index + 1).toString() + '.jpg'
        }`,
        folder: 'previews/',
        type: 'image/jpg',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      }))
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('StaticField')
  }
}
