const { graphql, buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql')

const { GraphQLSchema, GraphQLObject, GraphQLString, 
        GraphQLObjectType, GraphQLID, GraphQLInt,
        GraphQLNonNull } = require('graphql');

const express = require('express');
const server = express();

// const schema = buildSchema(`
//     type EchoType {
//         id: ID,
//         prefix: String,
//         message: String,
//         built_message: String
//     },
//     type Query {
//         echo(prefix: String, message: String!): EchoType
//     }
// `);

const EchoType = new GraphQLObjectType({
        name: 'Echo',
        fields:() => ({
            id: { type: GraphQLID },
            prefix: { type: GraphQLString},
            message: { type: GraphQLString},
            built_message: { type: GraphQLString }
        })
    }
)

const RootQuery= new GraphQLObjectType({
    name: 'RootQueryType', 
    fields: {
        echo: {
            type: EchoType, // <--
            args: {
                prefix: { type: GraphQLString},
                message: { type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentValue, args) {
                return  {   
                            id: "some-unique-id",
                            prefix: args.prefix, 
                            message: args.message,
                            built_message: args.prefix + ": " + args.message,
                        }
            }
        }
    }
}) 

const schema = new GraphQLSchema({
   query: RootQuery
})

server.use('/graphql', graphqlHTTP({
    schema, 
    // rootValue: resolver, // <--
    graphiql: true
}));

server.listen(3000, () => {
        console.log('Server is running: http://localhost:3000/')
    }
)