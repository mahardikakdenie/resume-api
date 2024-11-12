import { getDataUserService } from "../../services/userService";

const resolvers = {
    Query: {
      hello: () => {
        return 'Hello';
      },
      users: async (_root: any, { email }: { email: string }) => {
        const payload: { email?:string } = {};
        if (email) {
            payload.email = email;
        }
        return await getDataUserService(payload);
      }
    },
    Mutation: {
      createJob: () => {
        return {
          success: 'Halo',
        };
      },
    },
  };
  
  export default resolvers;
  