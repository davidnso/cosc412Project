import { MongoDriver } from "../mongo/mongoDriver";
import { MongoClient } from "mongodb";


export type UserAccountCreationParams = {
username: string,
password: string,
Address1:string,
address2:string,
Email: string
Role: string,
Associations: string[]
}

export async function initDBconnection(){ 
    const db = await MongoDriver.buildDriver()
    return db?.collection('users');
}

export async function closeDbConnection(){
    const db = await MongoDriver.closeDriver();
}

export async function createUserAccount(args:UserAccountCreationParams){
    try {
        if(args!==undefined){

           const db = await initDBconnection();
           await db?.insert(args);

            MongoDriver.closeDriver();
        }
    } catch (error) {
        throw error;
    }
}

export async function login(args: { 
    username: string,
    password: string,
}){
    try {
        const db = await initDBconnection()

        const user = await db?.findOne({username: args.username});

        if(args.password === user.password){
            return {user};
        }
    } catch (error) {
        throw error;
    }
}