import {MongoClient } from 'mongodb';

export class MongoDriver{ 
    db:any; 
    constructor(){
        this.db = MongoClient.connect('');
    }

    
}