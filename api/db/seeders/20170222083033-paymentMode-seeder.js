'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('paymentMode', [
        {
          mode: 'online',
        },
        {
          mode: 'cash on delivery',
        },
      ], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('paymentMode', null, {});
  }
};
