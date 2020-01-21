'use strict';
module.exports = (sequelize, DataTypes) => {
  const toDoList = sequelize.define('toDoList', {
    type: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  }, {});
  toDoList.associate = function(models) {
    // associations can be defined here
    toDoList.belongsTo(models.User,
      {
        foreignkey: 'userId',
        targetkey: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
  };
  return toDoList;
};