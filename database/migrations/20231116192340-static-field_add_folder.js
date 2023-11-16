'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn('StaticField', 'folder', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      defaultValue: 'uploads/'
    })
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.removeColumn('StaticField', 'folder')
  }
}
