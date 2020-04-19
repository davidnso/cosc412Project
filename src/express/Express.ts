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
            res.json({message: 'Welcome to our Software Engineering project backend! version 1.0.0'})
        } );
         
        //User module specific routes... 
        this.router.get('/user/create_account', async (req: Request, res: Response, next: NextFunction)=>{
            try {
                const userInfo = req.body.info;
                await userHandlerFunctions.createUserAccount(userInfo);
                res.json({success: 'it worked'})
            } catch (error) {
                res.json(error);
            }
        } );
        this.router.get('/user/login', async (req: Request, res: Response, next: NextFunction)=>{
            try {
                const loginInfo : { 
                    username: string,
                    password: string
                }= req.body.info

               await userHandlerFunctions.login(loginInfo);
            } catch (error) {
                res.json(error).status(400);
            }
        } );


        this.router.post('/donate', async (req: Request, res: Response, next: NextFunction)=>{
            try {
                const dontationInfo: { 
                    amount: string,
                    firstName: string,
                    lastName: string,
                    city: string,
                    state: string
                } = req.body.info

                // await donationHandlerFunctions.logDonation(dontationInfo);
            } catch (error) {
                res.json(error).status(400)
            }
        } );
        this.router.get('/donate', async (req: Request, res: Response, next: NextFunction)=>{
            try {
                // const donations = await donationHandlerFunctions.fetchDonations();
               // res.json({donations})
            } catch (error) {
                res.json(error).status(400);
            }
        } );

        this.router.get('/stats', (req: Request, res: Response, next: NextFunction)=>{
            try {
                
                
            } catch (error) {
                res.json(error).status(400);
            }
        } );
        this.router.post('/stats/:username', (req: Request, res: Response, next: NextFunction)=>{
            res.json({message: 'Welcome to our Software Engineering project backend! version 1.0.0'})
        } );

       
        return this.router;
    }

    
}