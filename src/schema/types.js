import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import { GetAllToDoListByUseId } from '../resolvers/TodoListResolver';
import { GetAllToDoByListId } from '../resolvers/ToDoResolver';

const AuthPayload = new GraphQLObjectType({
  name: 'Auth',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

const ToDoType = new GraphQLObjectType({
  name: 'ToDo',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    location: { type: GraphQLString },
    toDoListId: { type: GraphQLString },
    updatedTime: { type: GraphQLString },
    endTime: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    startTime: { type: GraphQLString },
  }),
});

const ToDoListType = new GraphQLObjectType({
  name: 'ToDoList',
  fields: () => ({
    id: { type: GraphQLString },
    type: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    createdTime: { type: GraphQLString },
    updatedTime: { type: GraphQLString },
    toDo: {
      type: new GraphQLList(ToDoType),
      resolve(parent, args, req) {
        return GetAllToDoByListId(parent.dataValues.id, req);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
    image_url: { type: GraphQLString },
    image_secure_url: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    toDoList: {
      type: new GraphQLList(ToDoListType),
      resolve(parent, args, req) {
        return GetAllToDoListByUseId(parent.dataValues.id, req);
      },
    },
  }),
});

export {
  AuthPayload,
  UserType,
  ToDoListType,
  ToDoType,
};
