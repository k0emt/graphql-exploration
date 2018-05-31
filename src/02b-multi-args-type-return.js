const { graphql, buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql')

const express = require('express');
const server = express();

const schema = buildSchema(`
    type EchoType {
        id: ID,
        prefix: String,
        message: String,
        built_message: String
    },
    type Query {
        echo(prefix: String, message: String!): EchoType
    }
`);

const resolver = {
    echo: ({prefix, message}) => {
        return  {   
            id: "some-unique-id",
            prefix: prefix, 
            message: message,
            built_message: prefix + ": " + message,
            nonTypeField: "yuk"      // <--
        };
    },
};

server.use('/', graphqlHTTP({
    schema, 
    rootValue: resolver,
    graphiql: true
}));

server.listen(3000, () => {
        console.log('Server is running... http://localhost:3000/')
    }
)