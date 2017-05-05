const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define(
    'user',
    {
      id: { allowNull: false, autoIncrement: true,  primaryKey: true, type: Sequelize.INTEGER},
      email: {  type: Sequelize.STRING, allowNull: false },
      hash: { type: Sequelize.STRING, allowNull: false  },
      firstname: {  type: Sequelize.STRING, allowNull: true },
      salt: { type: Sequelize.STRING, allowNull: false  },
    },
    {
      timestamps: false,
      tableName: 'users'
    }
  );



// Update user
  User.updateUser = (data) => new Promise((resolve, reject) => {
    User.update(data, {where:{id:data.id}})
      .then(resolve)
      .catch('error')

  })
  User.updateStatus = (data) => new Promise((resolve, reject) => {
    User.update(data, {where:{id:data.id}})
      .then(resolve)
      .catch('error')

  })

  User.getUser = (data) => new Promise((resolve, reject) => {
    User.findOne({where:{verifyToken:data}})
      .then(resolve)
      .catch('error')

  })

  User.getUserData = (data) => new Promise((resolve, reject) => {
    User.findOne({where:{id:data}})
      .then(resolve)
      .catch('error')

  })
  return User;
};
