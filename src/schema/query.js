import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';
import { UserType, AuthPayload } from './types';
import {
  getUserByIdResolver,
  getAllUsersResolver,
  signinResolver,
} from '../resolvers/UserResolver';


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


export default RootQuery;
