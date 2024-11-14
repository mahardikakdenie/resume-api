import { createProject, deleteProject, getDataProject, updateProject } from "../../services/projectService";

import { I_ProjectDTO } from "../../libs/interface/project.interface";

const resolvers = {
    Query: {
        projects: async (_root: any, { name }: { name?: string }) => {
            return await getDataProject({ name });
        }
    },
    
    Mutation: {
        createProject: async (_root: any, { project }: { project: I_ProjectDTO }) => {
            try {
                const newProject = await createProject(project);
                return newProject;
            } catch (error: unknown) {
                throw new Error(`Failed to fetch user data: ${error instanceof Error ? error.message : String(error)}`);
            }
        },
        updateProject: async (_root: any, { id, project }: { id: string, project: Partial<I_ProjectDTO> }) => {
            try {
                return await updateProject(id, project);
            } catch (error: unknown) {
                throw new Error(`Failed to fetch user data: ${error instanceof Error ? error.message : String(error)}`);
            }
        },
        deleteProject: async (_root: any, { id }: { id: string }) => {
            try {
                return await deleteProject(id);
            } catch (error: unknown) {
                throw new Error(`Failed to fetch user data: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
    }
};

export default resolvers;