import { Media } from "./media.interface";

export interface I_SocialMedia {
    key?: string;
    username?: string;
    link?: string
}

export interface I_Contributor {
    name: string;
    profile: {
        social_media?: I_SocialMedia[]
    }
}

export interface I_Information {
    contributors: I_Contributor[];
}

export interface I_ProjectDTO {
    name: string;
    description: string;
    media: Media;
    information?: I_Information;
}   