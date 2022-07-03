'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const dataCast = require('../cast.json')
     dataCast.forEach(el => {
       el.createdAt = el.updatedAt = new Date()
     })
     await queryInterface.bulkInsert("Casts", dataCast, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Casts', null, {});
     */
     await queryInterface.bulkInsert("Casts", null, {})
  }
};
