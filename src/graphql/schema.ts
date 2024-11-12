import { gql } from 'graphql-tag';
import { mergeTypeDefs } from '@graphql-tools/merge';
import userTypeDefs from './user/schema';
import experienceSchema from './experiences/schema';

const typeDefs = mergeTypeDefs([userTypeDefs, experienceSchema]);

export default typeDefs;
