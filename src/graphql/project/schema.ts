import {gql} from "graphql-tag";

const typeDefs = gql`
    type Query {
        projects: [Project]
    }

    type Mutation {
        createProject(project: ProjectDTO): Project
    }

    type Project {
        id: ID!
        name: String!
        description: String
        media: Media
        information: Information
    }

    input ProjectDTO {
        name: String!
        description: String
        media: MediaInput
        information: InformationInput
    }

    type Media {
        thumbnail: Thumbnail
        other: [OtherMedia]
    }

    type Thumbnail {
        url: String
    }

    type OtherMedia {
        url: String
    }

    type Information {
        contributors: [Contributor]
    }

    type Contributor {
        name: String
        profile: Profile
    }

    type Profile {
        social_media: [SocialMedia]
    }

    type SocialMedia {
        key: String
        username: String
        link: String
    }

    input MediaInput {
        thumbnail: ThumbnailInput
        other: [OtherMediaInput]
    }

    input ThumbnailInput {
        url: String
    }

    input OtherMediaInput {
        url: String
    }

    input InformationInput {
        contributors: [ContributorInput]
    }

    input ContributorInput {
        name: String
        profile: ProfileInput
    }

    input ProfileInput {
        social_media: [SocialMediaInput]
    }

    input SocialMediaInput {
        key: String
        username: String
        link: String
    }
`;

export default typeDefs;