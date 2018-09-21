// see this example: https://github.com/iamshaunjp/graphql-playlist/blob/lesson-13/server/schema/schema.js

const { graphql, buildSchema } = require('graphql');
const { GraphQLSchema, GraphQLObject, GraphQLString, 
    GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLFloat,
    GraphQLNonNull, GraphQLList } = require('graphql');

const graphqlHTTP = require('express-graphql')

const express = require('express');
const server = express();

const bridges = require('../data/bridges.json');
const trolls = require('../data/trolls.json');

const BridgeType = new GraphQLObjectType({
    name: 'Bridge',
    fields:() => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        lat: { type: GraphQLFloat },
        lng: { type: GraphQLFloat },
        year: { type: GraphQLInt },
        length: { type: GraphQLFloat },
        width: { type: GraphQLFloat }
    })
})

const TrollType = new GraphQLObjectType({
    name: 'Troll',
    fields:() => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        gender: { type: GraphQLString },
        color: { type: GraphQLString },
        bridge: {                   // <-- bridge mapping!
            type: BridgeType,
            resolve(parent, args) {
                return bridges[trolls[parent.id].bridgeId] // <-- parent.id
            }
         },
    })
})

const RootQuery= new GraphQLObjectType({
    name: 'FaeLandRootQuery', 
    fields: {
        bridgeById: {
            type: BridgeType,
            args: {
                id: { type: new GraphQLNonNull( GraphQLID ) }
            },
            resolve(parentValue, args) {
                return bridges[args.id]; // <-- I'm getting lucky here
            }
        },
        bridges: {
            type: GraphQLList(BridgeType), // <-- as opposed to []
            // args: {},
            resolve() {
                return bridges;
            }
        },
        narrowBridge: {
            type: GraphQLList(BridgeType), // <-- as opposed to []
            args: {
                maxWidth: { type: GraphQLFloat }
            },
            resolve(parentV, args) { // <-- if you need args, you need parent
                var matchedBridges = [];
                for(i = 0; i < bridges.length; i++) {
                    if(bridges[i].width < args.maxWidth ) {
                        matchedBridges.push(bridges[i]);
                    }
                }
                return matchedBridges;
            }
        },
        trollById: {
            type: TrollType,
            args: {
                id: { type: new GraphQLNonNull( GraphQLID ) }
            },
            resolve(parentValue, args) {
                // let thisTroll = trolls[args.id];
                // thisTroll.bridge = bridges[thisTroll.bridgeId];
                return trolls[args.id];
            }
        },
        trolls: {
            type: GraphQLList(TrollType),
            resolve() {
                return trolls; // <-- bridge mapping up above
            }
        },
    }
}) 

const schema = new GraphQLSchema({
   query: RootQuery
})

/*
const resolver = {
    trollById: ({id}) => {
        let thisTroll = trolls[id];
        thisTroll.bridge = bridges[thisTroll.bridgeId]; // but what about other queries?
        return thisTroll;
    }, 
};
*/

server.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true
}));

server.listen(3000, () => {
        console.log('Server is running... http://localhost:3000/')
    }
)