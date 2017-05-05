'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('sizeVariants', [
        {
          size: 'small',
          description: 'small in size'
        },
        {
          size: 'large',
          description: 'This is large size'
        },
        {
          size: 'xl',
          description: 'Extra large size'
        },
        {
          size: 'xxl',
          description: 'double Extra large size'
        },
      ], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('sizeVariants', null, {});
  }
};
