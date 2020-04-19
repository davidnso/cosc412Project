import {MongoClient, Db } from 'mongodb';
const MONGO_PASS = 'Password123'
const MONGO_URI = `mongodb+srv://dbUser:Password123@cluster0-usnul.mongodb.net/test?retryWrites=true&w=majority`
export class MongoDriver{ 
   static db:MongoClient; 
    
    static async buildDriver(){
        const client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
        try {
          await client.connect();
          console.log("connected");
          return client.db("safe")as Db;
        } catch (err) {
          console.log("Error on connect: " + err);
        }
      }

    static async closeDriver(){
        if(MongoDriver.db == undefined){
            throw new Error('Connection to Mongo has not been instantiated')
        }else{
            MongoDriver.db.close();
        }
    }
}