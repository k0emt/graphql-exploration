const { graphql, buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql')

const express = require('express');
const server = express();

const bridges = require('../data/bridges');     // external JSON data w/out extension
const trolls = require('../data/trolls.json');

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
    type TrollType {
        id: ID,
        name: String,
        gender: String,
        color: String,
        bridge: BridgeType
    },
    type Query {
        trollById(id: ID!): TrollType,
        byId(id: ID!): BridgeType,
        narrower(maxWidth: Float!): [BridgeType],
        bridges: [BridgeType]
    }
`);

const resolver = {
    trollById: ({id}) => {
        let thisTroll = trolls[id];
        thisTroll.bridge = bridges[thisTroll.bridgeId]; // but what about other queries?
        return thisTroll;
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
        console.log('Server is running... http://localhost:3000/')
    }
)