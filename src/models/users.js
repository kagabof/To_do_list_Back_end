'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    role: {
      type: DataTypes.STRING
    }
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};