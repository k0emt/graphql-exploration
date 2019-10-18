// start with: npx nodemon 04-using-fields-bridges.js

const { graphql, buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql')

const express = require('express');
const server = express();

const bridges = require('../data/bridges.json');

// what if maxWidth below is specified as an Int (from Float)?
// what if I change year to a string (from Float)?
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
        narrower(maxWidth: Float!): [BridgeType],
        bridges: [BridgeType]
    }
`);

const resolver = {
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
    },
    bridges:() => {
        return bridges;
    }
};

server.use('/graphql', graphqlHTTP({
    schema, 
    rootValue: resolver,
    graphiql: true
}));

server.listen(3000, () => {
        console.log('Server is running... http://localhost:3000/graphql')
    }
)