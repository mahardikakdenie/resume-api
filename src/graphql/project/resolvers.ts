import { getDataProject } from "../../services/projectService";

const resolvers = {
    Query: {
        projects: async () => {
            return await getDataProject();
        }
    }
};

export default resolvers;