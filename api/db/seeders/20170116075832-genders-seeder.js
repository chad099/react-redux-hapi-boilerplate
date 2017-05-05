'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('genders', [
        {
          gender: 'male',
          description: 'Product belongs to only male'
        },
        {
          gender: 'female',
          description: 'Product belongs to only female'
        },
        {
          gender: 'unisex',
          description: 'Product belongs to both male and female'
        },
      ], {});
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('genders', null, {});
  }
};
