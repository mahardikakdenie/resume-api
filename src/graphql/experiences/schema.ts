import { gql } from 'graphql-tag';
import { IExperience } from "../../repositories/experienceRepository";

const typeDefs = gql`
    type Query {
        experience: [Experience]
    }

    type Mutation {
        createExperience(data: ExperienceInput): Experience
    }

    type Experience {
        _id: ID
        name: String
        job: String
        since: String
        until: String
        description: String
    }

    input ExperienceInput {
        name: String
        job: String
        since: String
        until: String
        description: String
    }
`;

export default typeDefs;