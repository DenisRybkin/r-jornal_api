'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Category', [
      {
        id: 1,
        name: 'General',
        description: 'General direction in the field of IT'
      },
      {
        id: 2,
        name: 'C#',
        description: '.NET, web, mobile, desktop, cloud, microservices'
      },
      {
        id: 3,
        name: 'C++',
        description: 'Low-level programming'
      },
      {
        id: 4,
        name: 'C',
        description: 'Low-level programming'
      },
      {
        id: 5,
        name: 'Dart',
        description: 'Flutter, mobile, desktop, web'
      },
      {
        id: 6,
        name: 'Go',
        description: 'Web, microservices'
      },
      {
        id: 7,
        name: 'Haskell',
        description: 'Functional programming'
      },
      {
        id: 8,
        name: 'Java',
        description: 'Web, android, spring'
      },
      {
        id: 9,
        name: 'JavaScript',
        description: 'Web, front-end, back-end, React, Nest'
      },
      {
        id: 10,
        name: 'Kotlin',
        description: 'Mobile, Web'
      },
      {
        id: 11,
        name: 'PHP',
        description: 'Web, most popular'
      },
      {
        id: 12,
        name: 'Power Shell',
        description: 'Task automation framework'
      },
      {
        id: 13,
        name: 'Python',
        description: 'Data Science, web, big-data'
      },
      {
        id: 14,
        name: 'Ruby',
        description: 'Web'
      },
      {
        id: 15,
        name: 'Rust',
        description: 'Low-level programming'
      },
      {
        id: 16,
        name: 'Scala',
        description: 'Functional programming'
      },
      {
        id: 17,
        name: 'SQL',
        description: 'Structured Query Language'
      },
      {
        id: 18,
        name: 'TypeScript',
        description: 'Web, front-end, back-end, React, Nest'
      }
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Category', null)
  }
}
