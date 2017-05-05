'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('colors', [
        {
          value: '#ffffff',
          description: 'white color'
        },
        {
          value: '#000000',
          description: 'black color'
        },
        {
          value: '#808080',
          description: 'gray color'
        },
      ], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('colors', null, {});
  }
};
