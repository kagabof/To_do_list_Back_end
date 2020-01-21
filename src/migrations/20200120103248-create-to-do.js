
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('toDos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
    startTime: {
      type: Sequelize.TIME,
    },
    toDoListId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'toDoLists',
        key: 'id',
      },
    },
    updatedTime: {
      type: Sequelize.TIME,
    },
    endTime: {
      type: Sequelize.TIME,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('toDos'),
};
