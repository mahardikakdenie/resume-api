import { mergeResolvers } from '@graphql-tools/merge';
import userResolvers from './user/resolvers';
import experienceResolvers from './experiences/resolvers';

const resolvers = mergeResolvers([userResolvers, experienceResolvers]);

export default resolvers;
