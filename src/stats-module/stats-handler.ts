import { MongoDriver } from "../mongo/mongoDriver";
import { Db } from "mongodb";

export async function fetchUserStats(args: {
    username?: string;
    game?: string
  }) {
      try {

          let query:any = {};

          if(args.username){
              query.username = args.username;
          }
          if(args.game){
              query.game= args.game;
          }

          const scores = await MongoDriver.getInstance().findStats(query);


          return scores; 

      } catch (error) {
          throw error;
      }
  }
  

  export async function logStats(args: {
    username: string,
    date: string,
    score: string,
    game: string
  }) {
      try {
          await MongoDriver.getInstance().logStats(args);
      } catch (error) {
          throw error;
      }
  }
  