const { graphql, buildSchema} = require('graphql');
const { GraphQLSchema, GraphQLObject, GraphQLString, GraphQLObjectType, GraphQLID, GraphQLInt } = require('graphql');

const MeetingType = new GraphQLObjectType({
    name: 'Meeting',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        Building: { type: GraphQLString },
        Room: { type: GraphQLString },
        Day: { type: GraphQLString },
        Time: { type: GraphQLString },
        Duration: { type: GraphQLInt }
    }
})

const CourseType = new GraphQLObjectType({
    name: 'Course',
    fields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      Title: { type: new GraphQLNonNull(GraphQLString) },
      Description: { type: GraphQLString },
      Instructor: { type: GraphQLString },
      Meetings: [{ type: Meeting }],
      MaxStudents: { type: GraphQLInt}
    }
  })

