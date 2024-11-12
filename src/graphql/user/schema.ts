import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    hello: String
    users(email: String): [User]
  }

  type Mutation {
    createJob: JobResult
  }

  type User {
    name: String
    email: String
    password: String 
  }

  type JobResult {
    success: String
  }
`;

export default typeDefs;
