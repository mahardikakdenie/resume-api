import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    hello: String
    users(email: String): UsersResponse
  }

  type Mutation {
    createJob(email: String, name: String, password: String): User
  }

  type User {
    _id: ID
    name: String
    email: String
    password: String 
  }

  type JobResult {
    success: String
  }

  # Tipe untuk struktur meta
  type Meta {
    code: Int!
    message: String!
  }

  # Tipe untuk respons users, mengandung meta dan data
  type UsersResponse {
    meta: Meta!
    data: [User]
  }
`;

export default typeDefs;
