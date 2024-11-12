import express, { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './database';
import { checkAuth, handleLogin } from './middleware/auth';

dotenv.config();

const startServer = async () => {
  const app = express();

  // Konfigurasi CORS
  app.use(cors({
    origin: '*', // Untuk pengembangan, mengizinkan semua asal. Untuk produksi, sesuaikan dengan asal yang diizinkan.
    methods: ['GET', 'POST'],
  }));

  // Middlewares
  app.use(express.json()); // Body parser middleware for JSON
  app.use(checkAuth); // Authentication middleware (should be used before any route requiring auth)
  
  // Handle login route
  app.post('/login', handleLogin);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  interface AuthenticatedRequest extends Request {
    auth?: {
      sub: string;
      email: string;
      lat: number;
    };
  }

  // Ensure the context function returns a Promise
  const getContext = async ({ req }: { req: AuthenticatedRequest}): Promise<{ user: any }> => {
    // Ensure that `req.auth` is populated by the authMiddleware (express-jwt)
    return {
      user: req.auth, // This assumes `req.auth` is populated with user data by the JWT middleware
    };
  };

  // Use Apollo server's expressMiddleware with the context
  app.use(
    '/graphql',
    bodyParser.json(),
    expressMiddleware(server, {
      context: getContext, // Pass the async context function
    })
  );

  // Connect to the database
  connectDB();

  // Start the server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
};

startServer();
