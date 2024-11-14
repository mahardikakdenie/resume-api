import mongoose, { mongo, PipelineStage } from "mongoose";
import { create, getProjectRaw, updateProjectById } from "../repositories/projectRepository";
import { I_ProjectDTO } from "../libs/interface/project.interface";

export const getDataProject = async (payload?: { name?: string }) => {
    try {
        const pipelines: PipelineStage.Match[] = [
            {
                $match: {
                    is_deleted: {
                        $exists: false
                    },
                    ...(payload?.name && { name: payload.name }) // Menambahkan kondisi name jika ada
                }
            }
        ];

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

export const updateProject = async (id: string, data: Partial<I_ProjectDTO>) => {
    try {
        const projectId = new mongoose.Types.ObjectId(id);
        return await updateProjectById<I_ProjectDTO>(projectId, data);
    } catch (error) {
        throw new Error(`Failed to fetch project data: ${error instanceof Error ? error.message : String(error)}`);
    }
};

export const deleteProject = async (id: string) => {
    try {
        const projectId = new mongoose.Types.ObjectId(id);
        const data: { is_deleted: Date } = {
            is_deleted: new Date(),
        }
        return await updateProjectById<{ is_deleted: Date }>(projectId, data)
    } catch (error: unknown) {
        throw new Error(`Failed to fetch project data: ${error instanceof Error ? error.message : String(error)}`);
    }
};