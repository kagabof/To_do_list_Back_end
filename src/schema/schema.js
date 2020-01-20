import {
  GraphQLSchema,
} from 'graphql';
import Query from './query';
import Mutation from './mutation';


module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
