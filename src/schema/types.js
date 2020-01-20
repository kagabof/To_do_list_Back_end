import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} from 'graphql';


const AuthPayload = new GraphQLObjectType({
  name: 'Auth',
  fields: () => ({
    firstName: { type: GraphQLString },
    token: { type: GraphQLString },
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
  }),
});

const ToDoListType = new GraphQLObjectType({
  name: 'ToDoList',
  fields: () => ({
    type: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    createdTime: { type: GraphQLString },
    updatedTime: { type: GraphQLString },
  }),
});

export {
  AuthPayload,
  UserType,
  ToDoListType,
};
