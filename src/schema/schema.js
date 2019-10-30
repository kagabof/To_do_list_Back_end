const graphql = require('graphql')
import model from '../models';

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
                const User = [];
                console.log('>>>>> display');
                const users = Users.findOne({where: {id: args.id}})

                if(!users){
                    throw new Error('Error');
                }
                return users;
            }
        },
        Users: {
            type: new GraphQLList(UserType),
            resolve(parent, arges){
                const users = Users.findAll();
                if(!users){
                    throw new Error('Error');
                }

                return users;

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
                email: {type: GraphQLString},
                age: {type: GraphQLInt},
                role: {type: GraphQLString}
            },
            resolve(parent, args){
                console.log('?????',args);
                const data = Users.create({
                    name: args.name,
                    email: args.email,
                    age: args.age,
                    role: args.role
                }).then(data =>{
                    console.log('>>>>>>>>',data);
                }).catch(error => {
                    console.log('>>>>errors', Error);
                });
                console.log('?????', data);
                return data;
            }
        }
    },
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})