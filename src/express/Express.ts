import express, {Router, NextFunction, Response, Request} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

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
            res.json({message: 'Welcome to our Software Engineering project backend! version 1.0.0'})
        } );
        this.router.get('/donate', (req: Request, res: Response, next: NextFunction)=>{
            res.json({message: 'Welcome to our Software Engineering project backend! version 1.0.0'})
        } );
        this.router.post('/donate', (req: Request, res: Response, next: NextFunction)=>{
            res.json({message: 'Welcome to our Software Engineering project backend! version 1.0.0'})
        } );
        this.router.get('/stats', (req: Request, res: Response, next: NextFunction)=>{
            res.json({message: 'Welcome to our Software Engineering project backend! version 1.0.0'})
        } );
        this.router.post('/stats/:username', (req: Request, res: Response, next: NextFunction)=>{
            res.json({message: 'Welcome to our Software Engineering project backend! version 1.0.0'})
        } );

        
        //User module specific routes... 
        this.router.get('/create_account', (req: Request, res: Response, next: NextFunction)=>{
            res.json({message: 'Welcome to our Software Engineering project backend! version 1.0.0'})
        } );
        this.router.get('/login', (req: Request, res: Response, next: NextFunction)=>{
            res.json({message: 'Welcome to our Software Engineering project backend! version 1.0.0'})
        } );

        return this.router;
    }

    
}