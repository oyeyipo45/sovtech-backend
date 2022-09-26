export default {
  Query: {
    hello(): string {
      return 'hello world';
    },
    getPeople: async (_parent: any, { filter }: any, { dataSources }: any) => {
      try {
        return await dataSources.api.getAll({ filter });
      } catch (error) {
        return error;
      }
    },
    getPerson: async (_parent: any, args: any, { dataSources }: any) => dataSources.api.getPerson({ search: args.search }),
  },
};
