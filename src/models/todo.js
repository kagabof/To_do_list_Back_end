/* eslint-disable no-unused-vars */

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    startTime: {
      type: DataTypes.TIME,
    },
    endTime: {
      type: DataTypes.TIME,
    },
  }, {});
  Todo.associate = function (models) {
    // associations can be defined here
  };
  return Todo;
};
