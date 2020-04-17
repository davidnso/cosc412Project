import {MongoClient, Db } from 'mongodb';
const MONGO_PASS = 'Password123'
const MONGO_URI = `mongodb+srv://dbUser:Password123@cluster0-usnul.mongodb.net/test?retryWrites=true&w=majority`
export class MongoDriver{ 
   static db:any; 
    
    static async buildDriver(collection:string){
       const client = await MongoClient.connect(MONGO_URI);
       MongoDriver.db = client.db('safe').collection(collection);
        return MongoDriver.db;
    }

    static async closeDriver(){
        if(MongoDriver.db == undefined){
            throw new Error('Connection to Mongo has not been instantiated')
        }else{
            MongoDriver.db.close();
        }
    }
}