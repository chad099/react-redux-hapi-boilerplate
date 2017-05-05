'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('status', [
        {
          status: 'placed',
        },
        {
          status: 'shipped',
        },
        {
          status: 'near you',
        },
        {
          status: 'delivered'
        }
      ], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('status', null, {});
  }
};
