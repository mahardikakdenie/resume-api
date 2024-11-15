import { Request } from "express";
import axios from 'axios';
import FormData from 'form-data';
import { I_USER_AUTH } from "./interface/user.interface";

interface MulterRequest extends Request {
    file?: Express.Multer.File; // Pastikan ini ada
}

export const uploadImage = async (req: MulterRequest) => {
  try {
    if (!req?.file) {
      throw new Error('No file uploaded');
    }

    const form = new FormData();
    // Menggunakan buffer file langsung tanpa mengubahnya ke base64
    form.append('image', req.file.buffer, req.file.originalname); // Menyertakan nama file

    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    return response.data; // Mengembalikan data dari response
  } catch (error: unknown) {
    console.error('Error uploading image:', error);
    throw new Error(`Failed to upload image: ${error}`);
  }
};

export const checkLoggedIn = (context: I_USER_AUTH) => {
  if (!context.user) {
    throw new Error("User is not logged in or the token is invalid");
  }
  return context.user;  // Optionally, you can return the user object if you need it in the resolver
};

