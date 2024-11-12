import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './database';

dotenv.config();

const startServer = async () => {
  const app = express();

  // Konfigurasi CORS
  app.use(cors({
    origin: '*', // Untuk pengembangan, mengizinkan semua asal. Untuk produksi, sesuaikan dengan asal yang diizinkan.
    methods: ['GET', 'POST'],
  }));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    bodyParser.json(),
    expressMiddleware(server)
  );

  connectDB();
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server siap di http://localhost:${PORT}/graphql`);
  });
};

startServer();
