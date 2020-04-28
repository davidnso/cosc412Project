import {MongoClient, Db } from 'mongodb';
const MONGO_PASS = 'Password123'
const MONGO_URI = `mongodb+srv://asbailey00:oY7Mdg7YisS07NVu@scholars-1pfmh.mongodb.net/test?retryWrites=true&w=majority`
export class MongoDriver{ 
  static db: Db;
    private static instance: MongoDriver;
    
    static async buildDriver(){
        const client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
        try {
          await client.connect();

          return client.db('safe')
        } catch (err) {
          console.log("Error on connect: " + err);
        }
      }

      constructor(){
        MongoDriver.buildDriver().then(datastore=>{
          MongoDriver.db = datastore;
        })
      }

       async fetchUser(query){ 
        try {
         return await MongoDriver.db.collection('users').findOne(query)
        } catch (error) {
          throw error;
        }
      }

      async findUsers(query: {$text?: any}){ 
        try {
          // console.log(MongoDriver.db.collection('users'));
          return await MongoDriver.db.collection('users').find(query).toArray()
        } catch (error) {
          throw error;
        }
      }
      async createUser(args:any){ 
        try {
          await MongoDriver.db.collection('users').insertOne(args);
        } catch (error) {
          throw error;
        }
      }
      async logDonation(args: any){ 
        try {
          await MongoDriver.db.collection('donations').insertOne(args)
        } catch (error) {
          throw error;
        }
      }
      async findDonations(){ 
        try {
          return await MongoDriver.db.collection('donations').find().toArray();
        } catch (error) {
          throw error;
        }
      }
      async logStats(args){ 
        try {
          await MongoDriver.db.collection('stats').insertOne(args);
        } catch (error) {
          throw error;
        }
      }
      async findStats(query){ 
        try {
          return await MongoDriver.db.collection('stats').find(query).toArray();
        } catch (error) {
          throw error;
        }
      }

      static getInstance(){
        if (!MongoDriver.instance) {
          MongoDriver.instance = new MongoDriver();
        }
        return MongoDriver.instance
      }


    
}