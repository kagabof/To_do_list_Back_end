import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';
import {
  UserType, AuthPayload, ToDoListType, ToDoType,
} from './types';
import {
  getUserByIdResolver,
  getAllUsersResolver,
  signinResolver,
} from '../resolvers/UserResolver';
import { GetAllToDoListResolver } from '../resolvers/TodoListResolver';
import { GetAllToDoResolver } from '../resolvers/ToDoResolver';


const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    User: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return getUserByIdResolver(parent, args);
      },
    },
    Users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return getAllUsersResolver({ parent, args });
      },
    },
    Signin: {
      type: AuthPayload,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return signinResolver(parent, args);
      },
    },
    GetAllToDoList: {
      type: new GraphQLList(ToDoListType),
      resolve(parent, args, req) {
        return GetAllToDoListResolver(req);
      },
    },
    GetAllToDo: {
      type: new GraphQLList(ToDoType),
      resolve(parent, args, req) {
        return GetAllToDoResolver(req);
      },
    },
  }),
});


export default RootQuery;
