import express, {Router, NextFunction, Response, Request} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as userHandlerFunctions from '../user-module/user-handler';
export class ExpressDriver { 
 static app = express();

 static buildExpressDriver(){
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(ExpressRouteHandler.buildRouter());
    return this.app;
 }
}

export class ExpressRouteHandler { 
    static router = Router();

    static buildRouter(): Router{
        this.router.get('/', (req: Request, res: Response, next: NextFunction)=>{
            res.json({message: 'Welcome to our Mobile App Development project backend! version 1.0.0'})
        } );
        this.router.get('/donate', (req: Request, res: Response, next: NextFunction)=>{
            res.json({message: 'Welcome to our Mobile App Development project backend! version 1.0.0'})
        } );
        this.router.post('/donate', (req: Request, res: Response, next: NextFunction)=>{
            res.json({message: 'Welcome to our Mobile App Development project backend! version 1.0.0'})
        } );
        this.router.get('/stats', (req: Request, res: Response, next: NextFunction)=>{
            res.json({message: 'Welcome to our Mobile App Development project backend! version 1.0.0'})
        } );
        this.router.post('/stats/:username', (req: Request, res: Response, next: NextFunction)=>{
            res.json({message: 'Welcome to our Mobile App Development project backend! version 1.0.0'})
        } );

        
        //User module specific routes... 
        this.router.get('/user/create_account', (req: Request, res: Response, next: NextFunction)=>{
            try {
                const userInfo = req.body.info;
                userHandlerFunctions.createUserAccount(userInfo);
                res.json({success: 'it worked'})
            } catch (error) {
                res.json(error);
            }
        } );
        this.router.get('/user/login', (req: Request, res: Response, next: NextFunction)=>{
            res.json({message: 'Welcome to our Software Engineering project backend! version 1.0.0'})
        } );

        return this.router;
    }

    
}