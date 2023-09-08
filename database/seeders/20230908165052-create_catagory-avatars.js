'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('StaticField', [
      {
        id: 20,
        name: 'common.png',
        originalname: 'common.png',
        url: `${process.env.BASE_URL}/static/categories/common.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 21,
        name: 'c#.png',
        originalname: 'c#.png',
        url: `${process.env.BASE_URL}/static/categories/c#.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 22,
        name: 'c++.png',
        originalname: 'c++.png',
        url: `${process.env.BASE_URL}/static/categories/c++.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 23,
        name: 'c.png',
        originalname: 'c.png',
        url: `${process.env.BASE_URL}/static/categories/c.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 25,
        name: 'dart.png',
        originalname: 'dart.png',
        url: `${process.env.BASE_URL}/static/categories/dart.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 26,
        name: 'go.png',
        originalname: 'go.png',
        url: `${process.env.BASE_URL}/static/categories/go.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 27,
        name: 'haskell.png',
        originalname: 'haskell.png',
        url: `${process.env.BASE_URL}/static/categories/haskell.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 28,
        name: 'java.png',
        originalname: 'java.png',
        url: `${process.env.BASE_URL}/static/categories/java.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 29,
        name: 'javascript.png',
        originalname: 'javascript.png',
        url: `${process.env.BASE_URL}/static/categories/javascript.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 30,
        name: 'kotlin.png',
        originalname: 'kotlin.png',
        url: `${process.env.BASE_URL}/static/categories/kotlin.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 31,
        name: 'php.png',
        originalname: 'php.png',
        url: `${process.env.BASE_URL}/static/categories/php.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 32,
        name: 'power-shell.png',
        originalname: 'power-shell.png',
        url: `${process.env.BASE_URL}/static/categories/power-shell.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 33,
        name: 'python.png',
        originalname: 'python.png',
        url: `${process.env.BASE_URL}/static/categories/python.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 34,
        name: 'ruby.png',
        originalname: 'ruby.png',
        url: `${process.env.BASE_URL}/static/categories/ruby.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 35,
        name: 'rust.png',
        originalname: 'rust.png',
        url: `${process.env.BASE_URL}/static/categories/rust.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 36,
        name: 'scala.png',
        originalname: 'scala.png',
        url: `${process.env.BASE_URL}/static/categories/scala.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 37,
        name: 'sql.png',
        originalname: 'sql.png',
        url: `${process.env.BASE_URL}/static/categories/sql.png`,
        type: 'image/png',
        updatedAt: '2023-09-02T15:07:31.676Z',
        createdAt: '2023-09-02T15:07:31.676Z'
      },
      {
        id: 38,
        name: 'typescript.png',
        originalname: 'typescript.png',
        url: `${process.env.BASE_URL}/static/categories/typescript.png`,
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
