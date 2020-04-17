import { MongoDriver } from "../mongo/mongoDriver";


export type UserAccountCreationParams = {
username: string,
password: string,
Address1:string,
address2:string,
Email: string
Role: string,
Associations: string[]
}

export async function createUserAccount(args:UserAccountCreationParams){
    try {
        if(args!==undefined){
           const db = await MongoDriver.buildDriver('users');
           await db.insert(args);
            MongoDriver.closeDriver();
        }
    } catch (error) {
        throw error;
    }
}