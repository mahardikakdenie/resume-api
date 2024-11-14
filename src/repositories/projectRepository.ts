import { PipelineStage } from "mongoose";
import Project from "../models/Project";

export const getProjectRaw = async (pipelines?: PipelineStage[]) => {
    try {
        if ((pipelines && pipelines.length > 0) || !pipelines) {}

        return await Project.aggregate(pipelines);
    } catch (error) {
        throw new Error(`Failed to fetch user data: ${error instanceof Error ? error.message : String(error)}`);
    }
};

export const createProjects = async (projectDTO: {}) => {}