const { GraphQLScalarType, Kind } = require('graphql');
const { dateToDateString } = require('../utils/dates')

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return dateToDateString(value); // Convert outgoing Date to string for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming string to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // Convert hard-coded AST string to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

module.exports = { dateScalar };