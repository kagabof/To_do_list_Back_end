const graphql = require('graphql')
import model from '../models';
import {
    signupResolver,
    getUserByIdResolver,
    getAllUsersResolver,
} from '../resolvers/UserResolver'

const {Users} = model
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQL
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString },
        age: {type: GraphQLInt},
        password: {type: GraphQLString},
        role: {type: GraphQLString},
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString}
    })
    }
);

const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        User: {
            type: UserType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args){
                getUserByIdResolver(parent, args);
            }
        },
        Users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return getAllUsersResolver(parent, args);
            }
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        CreateUser: {
            type: UserType,
            args: {
                name: {type: GraphQLString},
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: GraphQLInt},
                role: {type: GraphQLString}
            },
            resolve(parent, args){
                return signupResolver(parent, args);
            }
        }
    },
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})