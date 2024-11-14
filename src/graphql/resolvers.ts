import { mergeResolvers } from '@graphql-tools/merge';
import userResolvers from './user/resolvers';
import experienceResolvers from './experiences/resolvers';
import projectResolvers from './project/resolvers';

const resolvers = mergeResolvers([userResolvers, experienceResolvers, projectResolvers]);

export default resolvers;
