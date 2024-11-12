import { mergeResolvers } from '@graphql-tools/merge';
import userResolvers from './user/resolvers';

const resolvers = mergeResolvers([userResolvers]);

export default resolvers;
