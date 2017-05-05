'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('variants', [
        {
          name: 'size',
          description: 'It is related to product size'
        },
        {
          name: 'color',
          description: 'It is related to product color'
        }
      ], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('variants', null, {});
  }
};
