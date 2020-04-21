import { MongoDriver } from "../mongo/mongoDriver";
import { MongoClient } from "mongodb";


export type UserAccountCreationParams = {
username: string,
password: string,
Address1:string,
address2:string,
Email: string
Role: string,
Associations?: string[]
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
           if(args.Role === 'parent'){
               if(args.Associations && args.Associations?.length < 1){
                   throw new Error("Parents need to choose which student they're related to" )
               }
           }
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

export async function fetchUsers(args: { 
    searchText: string
}){
    try {
        const db = await initDBconnection()

        let query:any = {}

        if(args.searchText){ 
            query.$text = {
                $search: args.searchText
            }
        }
        const users = await db?.find(query).toArray();
        
        return users;
    } catch (error) {
        throw error;
    }
}