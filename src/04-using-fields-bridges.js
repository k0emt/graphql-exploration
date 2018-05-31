const { graphql, buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql')

const express = require('express');
const server = express();

const bridges = require('../data/bridges.json');

// what if length below is specified as an Int?
// TODO add a narrower query
const schema = buildSchema(`
    type BridgeType {
        id: ID,
        name: String,
        lat: Float,
        lng: Float,
        year: Int,
        length: Float,
        width: Float
    },
    type Query {
        byId(id: ID!): BridgeType,
        narrower(maxWidth: Float!): [BridgeType]
    }
`);

const resolver = {
    echo: ({prefix, message}) => {
        return  {   
            id: "some-unique-id",
            prefix: prefix, 
            message: message,
            built_message: prefix + ": " + message
        };
    },
    byId: ({id}) => {
        return bridges[id]; // <-- I'm getting lucky here
    },
    narrower:({maxWidth}) => {
        var matchedBridges = [];
        for(i = 0; i < bridges.length; i++) {
            if(bridges[i].width < maxWidth ) {
                matchedBridges.push(bridges[i]);
            }
        }
        return matchedBridges;
    }
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