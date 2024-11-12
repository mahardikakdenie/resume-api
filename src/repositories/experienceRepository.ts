import { PipelineStage } from "mongoose";
import Experience from "../models/Experience";

export interface IExperience {
    name: String;
    job: String;
    since: String;
    until?: String;
    description: String;
}

export const getData = async (pipeline: PipelineStage[]): Promise<IExperience[]> => {
    try {
        if (pipeline.length === 0) {
            return await Experience.find({});
            
        }
        const experience = await Experience.aggregate(pipeline);

        return experience;
    } catch (error) {
        throw new Error(`Failed to fetch user data: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export const createExperience = async (data: IExperience) => {
    try {
        return await Experience.create(data);
    } catch (error) {
        throw new Error(`Failed to fetch user data: ${error instanceof Error ? error.message : String(error)}`);
    }
};