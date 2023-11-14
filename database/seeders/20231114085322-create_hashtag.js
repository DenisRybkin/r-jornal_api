'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Hashtag', [
      {
        name: 'React.js'
      },
      {
        name: 'Vue.js'
      },
      {
        name: 'Программирование'
      },
      {
        name: 'Разработка'
      },
      {
        name: 'DevOps'
      },
      {
        name: 'Технологии'
      },
      {
        name: 'Безопасность'
      },
      {
        name: 'DataScience'
      },
      {
        name: 'Кибербезопасность'
      },
      {
        name: 'АналитикаДанных'
      },
      {
        name: 'Cloud'
      },
      {
        name: 'CloudComputing'
      },
      {
        name: 'OpenSource'
      },
      {
        name: 'Programming'
      },
      {
        name: 'Development'
      },
      {
        name: 'Technologies'
      },
      {
        name: 'Security'
      },
      {
        name: 'CyberSecurity'
      },
      {
        name: 'DataAnalytics'
      },
      {
        name: 'DataBase'
      },
      {
        name: 'БазаДанных'
      },
      {
        name: 'Автоматизация'
      },
      {
        name: 'Automation'
      },
      {
        name: 'WebDevelopment'
      },
      {
        name: 'ВебРазработка'
      },
      {
        name: 'АрхитектураПО'
      },
      {
        name: 'SoftwareArchitecture'
      },
      {
        name: 'ИскусственныйИнтеллект'
      },
      {
        name: 'AI'
      },
      {
        name: 'МобильнаяРазработка'
      },
      {
        name: 'MobileDevelopment'
      },
      {
        name: 'СистемыУправленияПроектами'
      },
      {
        name: 'ProjectManagementSystems'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Hashtag', null)
  }
}
