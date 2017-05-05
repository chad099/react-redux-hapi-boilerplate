'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('status', [
        {
          status: 'created',
        },
        {
          status: 'pending',
        },
        {
          status: 'approve',
        },
      ], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('status', null, {});
  }
};
