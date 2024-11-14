import {gql} from "graphql-tag";

const typeDefs = gql`
    type Query {
        projects: [Project]
    }

    type Project {
        name: String
    }
`;

export default typeDefs;