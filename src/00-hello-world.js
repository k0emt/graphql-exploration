const { graphql, buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql')

const express = require('express');
const server = express();

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const resolver = {
    hello: () => {
        return "Hello World";
    },
};

server.use('/graphql', // entry point
    graphqlHTTP({
        schema, // short hand for schema: schema
        rootValue: resolver,
        graphiql: true
    })
);

server.listen(3000, () => {
    console.log('Server is running...http://localhost:3000/graphql/')
    console.log("curl --request GET --url http://localhost:3000/graphql/ --header 'content-type: application/json' --data '{\"query\":\"{hello}\"}'")
}
)
