'use strict'

const achievements = [
  {
    id: 1,
    name: 'Beginner',
    level: 1,
    requiredPoints: 0
  },
  {
    id: 2,
    name: 'Student',
    level: 2,
    requiredPoints: 250
  },
  {
    id: 3,
    name: 'Expert',
    level: 3,
    requiredPoints: 500
  },
  {
    id: 4,
    name: 'Master',
    level: 4,
    requiredPoints: 1000
  },
  {
    id: 5,
    name: 'Guru',
    level: 5,
    requiredPoints: 2500
  },
  {
    id: 6,
    name: 'Thinker',
    level: 6,
    requiredPoints: 5000
  },
  {
    id: 7,
    name: 'Sage',
    level: 7,
    requiredPoints: 10000
  },
  {
    id: 8,
    name: 'Enlightened',
    level: 8,
    requiredPoints: 20000
  },
  {
    id: 9,
    name: 'Oracle',
    level: 9,
    requiredPoints: 35000
  },
  {
    id: 10,
    name: 'Genius',
    level: 10,
    requiredPoints: 50000
  },
  {
    id: 11,
    name: 'Artificial intelligence',
    level: 11,
    requiredPoints: 75000
  },
  {
    id: 12,
    name: 'The higher intelligence',
    level: 12,
    requiredPoints: 100000
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Achievement', achievements)
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Achievement', null)
  }
}
