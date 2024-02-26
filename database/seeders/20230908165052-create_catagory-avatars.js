'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('StaticField', [
      {
        id: 32,
        name: 'common.png',
        originalname: 'common.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/common.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 33,
        name: 'c#.png',
        originalname: 'c#.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/c#.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 34,
        name: 'c++.png',
        originalname: 'c++.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/c++.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 35,
        name: 'c.png',
        originalname: 'c.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/c.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 36,
        name: 'dart.png',
        originalname: 'dart.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/dart.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 37,
        name: 'go.png',
        originalname: 'go.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/go.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 38,
        name: 'haskell.png',
        originalname: 'haskell.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/haskell.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 39,
        name: 'java.png',
        originalname: 'java.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/java.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 40,
        name: 'javascript.png',
        originalname: 'javascript.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/javascript.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 41,
        name: 'kotlin.png',
        originalname: 'kotlin.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/kotlin.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 42,
        name: 'php.png',
        originalname: 'php.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/php.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 43,
        name: 'power-shell.png',
        originalname: 'power-shell.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/power-shell.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 44,
        name: 'python.png',
        originalname: 'python.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/python.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 45,
        name: 'ruby.png',
        originalname: 'ruby.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/ruby.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 46,
        name: 'rust.png',
        originalname: 'rust.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/rust.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 47,
        name: 'scala.png',
        originalname: 'scala.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/scala.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 48,
        name: 'sql.png',
        originalname: 'sql.png',
        folder: 'topics/',
        url: `https://storage.yandexcloud.net/it-hub/topics/sql.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 49,
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

  async down(queryInterface) {
    await queryInterface.bulkDelete('StaticField', null)
  }
}
