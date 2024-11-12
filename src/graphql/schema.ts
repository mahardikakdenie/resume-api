import { gql } from 'graphql-tag';
import { mergeTypeDefs } from '@graphql-tools/merge';
import userTypeDefs from './user/schema';

const typeDefs = mergeTypeDefs([userTypeDefs]);

export default typeDefs;
