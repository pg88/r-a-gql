import Resolutions from './resolutions'
import Owners from './owners'
import Votes from './votes'
import Misvotes from './misvotes'
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
      Owners.insert({ email: args.email, name: args.ownerName });
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
    },
    increaseVote(obj, { target }, context) {
      return Votes.insert({ target: target, votedOn: Date.now() })
    },
    increaseMisVote(obj, { target }, context){
      return Misvotes.insert({ target: target, votedOn: Date.now() })
    }
  }
};
