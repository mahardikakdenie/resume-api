import { createProject, deleteProject, getDataProject, updateProject } from "../../services/projectService";

import { I_ProjectDTO } from "../../libs/interface/project.interface";
import { I_USER_AUTH } from "../../libs/interface/user.interface";
import { checkLoggedIn } from "../../libs/helpers";

const resolvers = {
    Query: {
        projects: async (_root: any, { name }: { name?: string }, context: I_USER_AUTH) => {
            try {
                return await getDataProject({ name });
            } catch (error: unknown) {
                throw new Error(`Failed to fetch user data: ${error instanceof Error ? error.message : String(error)}`)
            }
        }
    },
    
    Mutation: {
        createProject: async (_root: any, { project }: { project: I_ProjectDTO }, context: I_USER_AUTH) => {
            try {
                checkLoggedIn(context);
                const newProject = await createProject(project);
                return newProject;
            } catch (error: unknown) {
                throw new Error(`Failed to fetch user data: ${error instanceof Error ? error.message : String(error)}`);
            }
        },
        updateProject: async (_root: any, { id, project }: { id: string, project: Partial<I_ProjectDTO> }, context: I_USER_AUTH) => {
            try {
                checkLoggedIn(context);
                return await updateProject(id, project);
            } catch (error: unknown) {
                throw new Error(`Failed to fetch user data: ${error instanceof Error ? error.message : String(error)}`);
            }
        },
        deleteProject: async (_root: any, { id }: { id: string }, context: I_USER_AUTH) => {
            try {
                checkLoggedIn(context);
                return await deleteProject(id);
            } catch (error: unknown) {
                throw new Error(`Failed to fetch user data: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
    }
};

export default resolvers;