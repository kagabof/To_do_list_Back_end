import model from '../models';


const { toDoList } = model;


const createToDoListResolver = async (params, args, req) => {
  const { title, type, description } = args;
  let data;
  if (!req.isAuth) {
    throw new Error('Please signup or signin for creating a to do list!');
  }
  try {
    data = await toDoList.create({
      type: type || null,
      title: title || null,
      description: description || null,
      userId: req.userId,
    });
  } catch (error) {
    throw new Error(error);
  }
  if (data) {
    return data;
  }
  throw new Error('Todo list is not created!');
};


export default createToDoListResolver;
