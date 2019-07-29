import Resolutions from './resolutions'

const res = Resolutions.find({}).fetch();

export default {
  Query: {
    resolutions()  {
      return res;
    },
    resolutionLookUp(obj, { _id }, context) {
      return Resolutions.findOne(_id);
    }
  },
  Mutation: {
    createResolutions(obj, args, context) {
      const resolutionId = Resolutions.insert(args);
      return Resolutions.findOne(resolutionId);
    },
    updateVotes(obj, {id}, context) {
      Resolutions.update(id, {
        $inc: {
          likes: +1
        }
      });
      return Resolutions.findOne(id);
    },
    updateMisVotes(obj, {id}, context) {
      Resolutions.update(id, {
        $inc: {
          dislikes: +1
        }
      });
      return Resolutions.findOne(id);
    }
  }
};
