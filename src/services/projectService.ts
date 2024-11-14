import { PipelineStage } from "mongoose";
import { getProjectRaw } from "../repositories/projectRepository";

export const getDataProject = async (payload?: { name?: String }) => {
    try {
        const pipelines: PipelineStage[] = [];

        if (payload && payload.name) {
            const matchStage: PipelineStage.Match = {
                $match: { name: payload.name }
            };
            pipelines.push(matchStage);
        }

        return await getProjectRaw(pipelines);     
    } catch (error) {
        throw new Error(`Failed to fetch user data: ${error instanceof Error ? error.message : String(error)}`);
    }
};