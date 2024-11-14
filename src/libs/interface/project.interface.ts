import { Media } from "./media.interface";

export interface I_ProjectDTO {
    name: string;
    description: string;
    media: Media,
    information?: {}
}