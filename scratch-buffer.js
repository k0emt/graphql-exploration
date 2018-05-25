const { graphql, buildSchema} = require('graphql');
const { GraphQLSchema, GraphQLObject, GraphQLString, GraphQLObjectType, GraphQLID, GraphQLInt } = require('graphql');
const graphqlHTTP = require('express-graphql')

// const schema = buildSchema(`
//     type Query {
//         hello: String
//         answer: Int
//         counter: Int
//         first3Primes: [Int]
//         people: [Person]
//         person(id: Int): Person
//     }
//     type Mutation {
//         incrementCounter: Int
//     }
//     type Person {
//         firstName: String
//         lastName: String
//         email: String
//     }
// `);

const PersonType = new GraphQLObjectType({
    name: 'Person',
    fields: {
      id: { type: GraphQLID },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      email: { type: GraphQLString }
    }
  })
  
  const builtSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        person: {
          type: PersonType,
          args: {
            id: { type: GraphQLID }
          }
        }
      }
    }),
    mutation: new GraphQLObjectType({
        name: 'incrementCounter',
        fields: {
            incrementCounter: { type: GraphQLInt }
        }
    })
  })

let counterValue = 0;
let getPeople = () => {
    // go to database to get people
    return new Promise((resolve,reject) => {
        resolve(
            [
                {
                id: "1",
                firstName: "Lee",
                lastName: "Byron",
                email: "lee@byron.com"
            },
            {
                id: "2",
                firstName: "Lee2",
                lastName: "Byron",
                email: "lee@byron.com"
            },
            {
                id: "3",
                firstName: "Lee3",
                lastName: "Byron",
                email: "lee@byron.com"
            },
            ]
        )
    })
}

// collection of resolvers
const root = {
    hello: () => {
        return "Hello World";
    },
    answer: () => 42,
    counter: () => counterValue,
    first3Primes: () => [2,3,5],
    people: () => getPeople(),
    person: async args => {
        // with a real db, would go straight to database find
        const people = await getPeople();
        return people.find(person => person.id === args.id, 0)
    },
    incrementCounter: () => ++counterValue,
};

const express = require('express');
const server = express();

// server.use -- both get and post verbs will work

server.use('/', graphqlHTTP({
    schema: builtSchema, // short hand for schema: schema
    rootValue: root,
    graphiql: true
}));

server.listen(3000, () => {
        console.log('Server is running...')
    }
)