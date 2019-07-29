import ResolutionsResolver from "../../api/resolutions/resolvers"

const resolvers = {
  Query: {
    hi() {
      return "perrito"
    },
  },
  ...ResolutionsResolver,
};


module.exports = resolvers;