'use strict';

/***
 * Generate a 6 digit random number
 * @returns {number} 6 digits long number
 */
exports.randomNumber  = () => {
  return Math.ceil(Math.random() * 1000000);
};
