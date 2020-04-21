import { MongoDriver } from "../mongo/mongoDriver";
import { Db } from "mongodb";

export async function initDBconnection(){ 
    const db = await MongoDriver.buildDriver()
    return db?.collection('stats');
}

export async function closeDbConnection(){
     await MongoDriver.closeDriver();
}

export async function fetchUserStats(args: {
    username?: string;
    game?: string
  }) {
      try {

          const db = await initDBconnection();          
          let query:any = {};

          if(args.username){
              query.username = args.username;
          }
          if(args.game){
              query.game= args.game;
          }

          const scores = await db?.find(query);

          await closeDbConnection();

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
          const db = await initDBconnection();
          await db?.insertOne(args);
          closeDbConnection();
      } catch (error) {
          throw error;
      }
  }
  