import { IExperience } from "../../repositories/experienceRepository";
import { createExperienceData, getDataExperience } from "../../services/experienceService";

const resolvers = {
    Query: {
        experience: async () => await getDataExperience(),
    },
    Mutation: {
        createExperience: async (_root: any, {data: { name, job, since, until, description }}: {data: IExperience}) => {
            const payload = {data: { name, job, since, until, description }};
            return await createExperienceData(payload.data);
        }
    }
};

export default resolvers;