import { createUserService, getDataUserService } from "../../services/userService";

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
        const users = await getDataUserService(payload);

        return {
            meta: {
              code: 200,
              message: 'success',
            },
            data: users
          };
      }
    },
    Mutation: {
      createJob: async (_root: any, { name, email, password }: { name: string, email: string, password: string }) => {
        const userPayload = {
          name,
          email,
          password,
        };

        const user = await createUserService(userPayload);
        return user
      },
    },
  };
  
  export default resolvers;
  