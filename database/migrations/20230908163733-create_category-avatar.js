'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CategoryAvatar', {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'Category', key: 'id' },
        onDelete: 'CASCADE'
      },
      staticFieldId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'StaticField', key: 'id' },
        onDelete: 'CASCADE'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CategoryAvatar')
  }
}
