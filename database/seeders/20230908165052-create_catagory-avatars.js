'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('StaticField', [
      {
        id: 20,
        name: 'common.png',
        originalname: 'common.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/common.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 21,
        name: 'c#.png',
        originalname: 'c#.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/c#.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 22,
        name: 'c++.png',
        originalname: 'c++.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/c++.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 23,
        name: 'c.png',
        originalname: 'c.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/c.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 25,
        name: 'dart.png',
        originalname: 'dart.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/dart.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 26,
        name: 'go.png',
        originalname: 'go.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/go.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 27,
        name: 'haskell.png',
        originalname: 'haskell.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/haskell.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 28,
        name: 'java.png',
        originalname: 'java.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/java.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 29,
        name: 'javascript.png',
        originalname: 'javascript.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/javascript.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 30,
        name: 'kotlin.png',
        originalname: 'kotlin.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/kotlin.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 31,
        name: 'php.png',
        originalname: 'php.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/php.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 32,
        name: 'power-shell.png',
        originalname: 'power-shell.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/power-shell.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 33,
        name: 'python.png',
        originalname: 'python.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/python.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 34,
        name: 'ruby.png',
        originalname: 'ruby.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/ruby.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 35,
        name: 'rust.png',
        originalname: 'rust.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/rust.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 36,
        name: 'scala.png',
        originalname: 'scala.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/scala.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 37,
        name: 'sql.png',
        originalname: 'sql.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/sql.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 38,
        name: 'typescript.png',
        originalname: 'typescript.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/typescript.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('StaticField', null)
  }
}
