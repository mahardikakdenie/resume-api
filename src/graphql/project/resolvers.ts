import { createProject, getDataProject } from "../../services/projectService";

import { I_ProjectDTO } from "../../libs/interface/project.interface";

const resolvers = {
    Query: {
        projects: async () => {
            return await getDataProject();
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
        }
    }
};

export default resolvers;