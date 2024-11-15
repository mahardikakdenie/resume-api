import mongoose, { PipelineStage } from "mongoose";
import Project from "../models/Project";
import { I_ProjectDTO } from "../libs/interface/project.interface";

export const getProjectRaw = async (pipelines?: PipelineStage[]) => {
    try {
        if ((pipelines && pipelines.length === 0) || !pipelines) {
            return await Project.find({});
        }

        return await Project.aggregate(pipelines);
    } catch (error) {
        throw new Error(`Failed to fetch project data: ${error instanceof Error ? error.message : String(error)}`);
    }
};

export const create = async (projectDTO: I_ProjectDTO) => {
    try {
        return await Project.create(projectDTO);
    } catch (error) {
        throw new Error(`Failed to fetch project data: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export const updateProjectById = async <T> (id: mongoose.Types.ObjectId, data: Partial<T>) => {
    try {
        // Menggunakan findByIdAndUpdate dengan opsi untuk mengembalikan data terbaru setelah update
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }
        );
        
        return updatedProject;
    } catch (error) {
        throw new Error(`Failed to fetch project data: ${error instanceof Error ? error.message : String(error)}`);
    }
};