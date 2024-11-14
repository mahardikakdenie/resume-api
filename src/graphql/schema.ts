import { gql } from 'graphql-tag';
import { mergeTypeDefs } from '@graphql-tools/merge';
import userTypeDefs from './user/schema';
import experienceSchema from './experiences/schema';
import projectSchema from './project/schema';

const typeDefs = mergeTypeDefs([userTypeDefs, experienceSchema, projectSchema]);

export default typeDefs;
