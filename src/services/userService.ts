import { createUserRepo, getRawUser } from "../repositories/userRepository";
import bcrypt from 'bcrypt';
import { PipelineStage } from 'mongoose'; 

export const createUserService = async (userObj: { name: string, email: string, password: string; }) => {
    if (userObj?.password) {
        const hashedPassword = await bcrypt.hash(userObj.password, 10);
        userObj.password = hashedPassword
    }
    return await createUserRepo(userObj);
};

export const getDataUserService = async (payload: { email?: string }) => {
    const pipeline: PipelineStage[] = [];

    // Cek apakah email tersedia dalam payload
    if (payload.email) {
        const matchStage: PipelineStage.Match = {
            $match: { email: payload.email }
        };
        pipeline.push(matchStage);
    }

    const user = await getRawUser(pipeline);

    return user
};
