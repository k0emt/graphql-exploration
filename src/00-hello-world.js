const { graphql, buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql')

const express = require('express');
const server = express();

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = {
    hello: () => {
        return "Hello World";
    },
   };

server.use('/', graphqlHTTP({
    schema, // short hand for schema: schema
    rootValue: root,
    graphiql: true
}));

server.listen(3000, () => {
        console.log('Server is running...http://localhost:3000/')
    }
)