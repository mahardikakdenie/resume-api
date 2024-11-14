import { PipelineStage } from "mongoose";
import { create, getProjectRaw } from "../repositories/projectRepository";
import { I_ProjectDTO } from "../libs/interface/project.interface";

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
        throw new Error(`Failed to fetch project data: ${error instanceof Error ? error.message : String(error)}`);
    }
};

export const createProject = async (data: I_ProjectDTO) => {
    try {
        return await create(data);
    } catch (error) {
        throw new Error(`Failed to fetch project data: ${error instanceof Error ? error.message : String(error)}`);
    }
};