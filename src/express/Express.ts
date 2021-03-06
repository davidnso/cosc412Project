import express, { Router, NextFunction, Response, Request } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as userHandlerFunctions from "../user-module/user-handler";
import * as donationHandlerFunctions from "../donation-module/donation-handler";
import * as statsHanlderFunctions from "../stats-module/stats-handler";
import { MongoDriver } from "../mongo/mongoDriver";
export class ExpressDriver {
  static app = express();

  static buildExpressDriver() {
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(ExpressRouteHandler.buildRouter());
    return this.app;
  }
}

export class ExpressRouteHandler {
  static router = Router();

  static buildRouter(): Router {
    this.router.get("/", (req: Request, res: Response, next: NextFunction) => {
      res.json({
        message:
          "Welcome to our Software Engineering project backend! version 1.0.0",
      });
    });

    //User module specific routes...
    this.router.post(
      "/users/create_account",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const userInfo = req.body.info;
          await userHandlerFunctions.createUserAccount(userInfo);
          res.json({ success: "it worked" });
        } catch (error) {
          res.statusCode = 400;
          res.json({ error: error.message });
        }
      }
    );
    this.router.post(
      "/users/login",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const loginInfo: {
            username: string;
            password: string;
          } = req.body.info;

          const user = await userHandlerFunctions.login(loginInfo);
          res.json(user);
        } catch (error) {
          res.statusCode = 400;
          res.json({ error: error.message });
        }
      }
    );

    this.router.get(
      "/users/search",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const query = req.query.text;

          const result = await userHandlerFunctions.fetchUsers({
            searchText: query,
          });

          res.json(result);
        } catch (error) {
          res.statusCode = 400;
          res.json({ error: error.message });
        }
      }
    );

    this.router.post(
      "/donate",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const dontationInfo: {
            amount: string;
            name: string;
            address: string;
            apartment?: string;
            creditCardNum: string;
            ccv: string;
            expDate: string;
            zipCode: string;
            city: string;
            state: string;
          } = req.body.donationInfo;

          await donationHandlerFunctions.logDonation(dontationInfo);
          res.json({
            success: "Insert operation complete"
          })
        } catch (error) {
          res.statusCode = 400;
          res.json({ error: error.message });
        }
      }
    );
    this.router.get(
      "/donate",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const donations = await donationHandlerFunctions.fetchDonations();
          res.json(donations);
        } catch (error) {
          res.statusCode = 400;
          res.json({ error: error.message });
        }
      }
    );

    this.router.get(
      "/stats",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const username = req.query.username ? req.query.username : null;
          const game = req.query.game ? req.query.game : null;

          const stats = await statsHanlderFunctions.fetchUserStats({
            username,
            game,
          });
          res.json(stats);
        } catch (error) {
          res.statusCode = 400;
          res.json({ error: error.message });
        }
      }
    );
    this.router.post(
      "/stats/:username",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const username = req.params.username;
          const record: {
            score: string;
            game: string;
            date: string;
          } = req.body.info;

          await statsHanlderFunctions.logStats({
            ...record,
            username,
          });
          res.json({ complete: "Score successfully logged" });
        } catch (error) {
          res.statusCode = 400;
          res.json({ error: error.message });
        }
      }
    );

    return this.router;
  }
}
