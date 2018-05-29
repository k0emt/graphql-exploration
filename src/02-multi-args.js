const { graphql, buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql')

const express = require('express');
const server = express();

const schema = buildSchema(`
    type Query {
        echo(prefix: String, message: String!): String
    }
`);

const root = {
    echo: ({prefix, message}) => {
        return prefix + ': ' + message;
    },
};

server.use('/', graphqlHTTP({
    schema, 
    rootValue: root,
    graphiql: true
}));

server.listen(3000, () => {
        console.log('Server is running...http://localhost:3000/')
    }
)