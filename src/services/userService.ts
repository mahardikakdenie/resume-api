import { createUserRepo, getRawUser } from "../repositories/userRepository";
import bcrypt from 'bcrypt';
import mongoose, { Mongoose, PipelineStage } from 'mongoose'; 

export const createUserService = async (userObj: { name: string, email: string, password: string; }) => {
    if (userObj?.password) {
        const hashedPassword = await bcrypt.hash(userObj.password, 10);
        userObj.password = hashedPassword
    }
    return await createUserRepo(userObj);
};

export const getDataUserService = async (payload: { email?: string }): Promise<{
    _id: mongoose.ObjectId
    name: string
    email: string
    password: string
}[]> => {
    const pipeline: PipelineStage[] = [];

    if (payload.email) {
        const matchStage: PipelineStage.Match = {
            $match: { email: payload.email }
        };
        pipeline.push(matchStage);
    }

    const user = await getRawUser(pipeline);

    return user;
};
