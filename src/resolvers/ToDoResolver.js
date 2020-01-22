import { GraphQLError } from 'graphql';
import model from '../models';

const { toDo } = model;
const CreateToDo = async (parent, args, req) => {
  const {
    title, description, location, toDoListId, endTime,
  } = args;
  try {
    if (!req.userId) {
      throw new GraphQLError('Please signup or signin for creating a to do list!');
    }
    if (!toDoListId) {
      throw new GraphQLError('No toDoListId provided!');
    }
    if (!title) {
      throw new GraphQLError('No title provided!');
    }
    const data = await toDo.create({
      title,
      description,
      location,
      toDoListId,
      endTime: endTime || null,
    });
    return data && data.dataValues;
  } catch (error) {
    throw new GraphQLError(error);
  }
};

export default CreateToDo;
