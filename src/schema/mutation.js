import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import {
  UserType,
  ToDoListType,
  ToDoType,
} from './types';
import {
  signupResolver,
} from '../resolvers/UserResolver';
import { createToDoListResolver } from '../resolvers/TodoListResolver';
import { CreateToDo } from '../resolvers/ToDoResolver';


const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    CreateUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        image_url: { type: GraphQLString },
        image_secure_url: { type: GraphQLString },
        role: { type: GraphQLString },
      },
      resolve(parent, args) {
        return signupResolver(parent, args);
      },
    },
    CreateToDoList: {
      type: ToDoListType,
      args: {
        type: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parent, args, req) {
        return createToDoListResolver(parent, args, req);
      },
    },
    CreateToDo: {
      type: ToDoType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        location: { type: GraphQLString },
        toDoListId: { type: new GraphQLNonNull(GraphQLInt) },
        endTime: { type: GraphQLString },
        startTime: { type: GraphQLString },
      },
      description: 'It is an array of of to do',
      resolve(parent, args, req) {
        return CreateToDo(parent, args, req);
      },
    },
  }),
});


export default Mutation;
