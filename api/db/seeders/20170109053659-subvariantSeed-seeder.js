'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('subVariants', [
        {
          variantId: 1,
          value: 'small',
        },
        {
          variantId: 1,
          value: 'large',
        },
        {
          variantId: 1,
          value: 'xl',
        },
        {
          variantId: 1,
          value: 'xxl',
        },
        {
          variantId: 2,
          value: '#ffffff',
        },
        {
          variantId: 2,
          value: '#000000',
        },
        {
          variantId: 2,
          value: '#808080',
        },

      ], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('subVariants', null, {});
  }
};
