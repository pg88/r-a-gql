import Resolutions from './resolutions'
import Owners from './owners'
import Votes from './votes'
import Misvotes from './misvotes'
import { Promise } from "meteor/promise";

export default {
  Query: {
    resolutions()  {
      return Resolutions.find({}).fetch();
    },
    resolutionLookUp(obj, { _id }, context) {
      return Resolutions.findOne(_id);
    },
    mostVoted() {
      const pipeline = [
        {
          $match: {
            likes: { $gte: 50 }
          }
        },{
          $group:{
            _id: "$_id",
            likes: { $max: "$likes" }, total: { $sum: "$likes" }
          }
        }
      ];

      const result = Promise.await(Resolutions.aggregate(pipeline).toArray());
      return result[0];
    },
    mostMisVoted() {
      const pipeline = [
        {
          $match: {
            dislikes: { $gte: 50 }
          }
        },{
          $group:{
            _id: "$_id",
            dislikes: { $max: "$dislikes" }, total: { $sum: "$dislikes" }
          }
        }
      ];
      const result = Promise.await(Resolutions.aggregate(pipeline).toArray());
      return result[0];
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
        },
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
      Votes.insert({ target: target, votedOn: Date.now() });
      return Votes.findOne({ target: target });

    },
    increaseMisVote(obj, { target }, context){
      Misvotes.insert({ target: target, votedOn: Date.now() });
      return Misvotes.findOne({ target: target });
    }
  }
};
