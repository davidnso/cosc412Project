import { MongoDriver } from "../mongo/mongoDriver";
import { MongoClient, Db } from "mongodb";


export type UserAccountCreationParams = {
username: string,
password: string,
Address1:string,
address2:string,
email: string
role: string,
associations?: string[]
}


export async function createUserAccount(args:UserAccountCreationParams){
    try {

        console.log('result here')
        const user = await MongoDriver.getInstance().fetchUser({username: args.username});
        if(user){
            throw new Error(`User with the username ${args.username} already exists. `)
        }
        
           if(args.role === 'parent'){
               if(args.associations === undefined){
                   throw new Error("Parents need to choose which student they're related to" )
               }else{
                await MongoDriver.getInstance().createUser(args);
               }
           }
           if(args.role === 'student'){
            const opResult = await MongoDriver.getInstance().createUser(args);

           }else{
               throw new Error('The user was not given a role')
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
        console.log('trying')
        const user = await MongoDriver.getInstance().fetchUser({username: args.username});
        console.log(user)
        if(user){
            if(args.password === user.password){
                return {user};
            }else{ 
                throw new Error('Incorrect username or password')
            }
        }else{ 
            throw new Error('Incorrect username or password')
        }
    } catch (error) {
        throw error;
    }
}

export async function fetchUsers(args: { 
    searchText: string
}){
    try {

        let query:any = {}

        if(args.searchText){ 
            query.$text = {
                $search: args.searchText
            }
        }
        const users = await MongoDriver.getInstance().findUsers(query);
        return users;
    } catch (error) {
        throw error;
    }
}