import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import {
  signupResolver,
  getUserByIdResolver,
  getAllUsersResolver,
  signinResolver,
} from '../resolvers/UserResolver';


const AuthPayload = new GraphQLObjectType({
  name: 'Auth',
  fields: () => ({
    name: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
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
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    CreateUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
