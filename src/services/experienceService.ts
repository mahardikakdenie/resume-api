import { createExperience, getData, IExperience } from "../repositories/experienceRepository";

export const createExperienceData = async (data: IExperience) => {
    return await createExperience(data);
};

export const getDataExperience = async () => {
    return await getData([]);
};