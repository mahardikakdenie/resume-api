import { expressjwt, Request as JWTRequest } from 'express-jwt';
import jwt from 'jsonwebtoken';
import { getDataUserService } from '../services/userService'
import { IUser, IUserResponse } from '../repositories/userRepository';
import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

const secret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');


export const authMiddleware = expressjwt({
  algorithms: ['HS256'],
  credentialsRequired: false,
  secret,
  getToken: (req: Request) => {
    return req.headers.authorization?.split(' ')[1] || undefined
  },
});

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req as JWTRequest, res, next);
};

interface LoginRequestBody {
  email: string;
  password: string;
}

export async function handleLogin(req: Request, res: Response) {
  const { email, password }: LoginRequestBody = req.body as unknown as LoginRequestBody;
  const payload = {
    email,
  }
  const user: IUserResponse[] = await getDataUserService(payload);
  
  if (!await bcrypt.compareSync(password, user[0].password)) {
    res.sendStatus(401);
  } else {
    const claims = { sub: user[0]._id, email: user[0].email};
    const token = jwt.sign(claims, secret);
    res.json({ token });
  }
}
