const { graphql, buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql')

const express = require('express');
const server = express();

const schema = buildSchema(`
    type Query {
        echo(message: String!): String
    }
`);

const root = {
    echo: ({message}) => {
        return message;
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