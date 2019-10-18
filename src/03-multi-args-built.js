const { graphql, buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql')

const { GraphQLSchema, GraphQLObject, GraphQLString, 
        GraphQLObjectType, GraphQLID, GraphQLInt,
        GraphQLNonNull } = require('graphql');

const express = require('express');
const server = express();

// const schema = buildSchema(`
//     type Query {
//         echo(prefix: String, message: String!): String
//     }
// `);

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'QueryRoot',  // <-- check out schema explorer
        fields: {
            echo: {
                type: GraphQLString,
                args: {
                    prefix: { type: GraphQLString},
                    message: { type: new GraphQLNonNull(GraphQLString)},
                }
            }
        }
    }) 
})

const resolver = {
    echo: ({prefix, message}) => {
        return prefix + ': ' + message;
    },
};

server.use('/graphql', graphqlHTTP({
    schema, 
    rootValue: resolver,
    graphiql: true
}));

server.listen(3000, () => {
        console.log('Server is running: http://localhost:3000/graphql')
    }
)