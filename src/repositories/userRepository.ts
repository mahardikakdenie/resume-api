
import User from "../models/User";
import mongoose, { PipelineStage } from 'mongoose';
import { Request } from "express-jwt";


export interface IUser {
    name: String;
    email: String;
    password: String;
}

export interface IUserResponse {
    _id: mongoose.ObjectId
    name: string
    email: string
    password: string
}

export const createUserRepo = async (userData: unknown) => {
    return await User.create(userData);
};

export const getRawUser = async (payload: PipelineStage[]): Promise<IUserResponse[]> => {
    try {
        if (payload.length === 0) {
            return await User.find();
        }

        return await User.aggregate(payload);
    } catch (error) {
        console.error('Error in getRawUser:', error);
        throw new Error(`Failed to fetch user data: ${error instanceof Error ? error.message : String(error)}`);
    }
}


export const getUserById = async (userId: string) => {
    try {
        // Konversi userId string menjadi ObjectId
        const objectId = new mongoose.Types.ObjectId(userId);

        // Mencari user berdasarkan ObjectId
        const user = await User.findById(objectId);

        // Jika user tidak ditemukan
        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error(`Error fetching user: ${error}`);
    }
};
