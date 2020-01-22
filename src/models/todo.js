'use strict';
module.exports = (sequelize, DataTypes) => {
  const toDo = sequelize.define('toDo', {
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
    toDoListId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'toDoLists',
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.TIME,
    },
    updatedAt: {
      type: DataTypes.TIME,
    },
    endTime: {
      type: DataTypes.TIME,
    },
  }, {});
  toDo.associate = function(models) {
    toDo.belongsTo(models.toDoList,
      {
        foreignkey: 'toDoListId',
        targetkey: 'id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
  };
  return toDo;
};