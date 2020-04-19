import { MongoDriver } from "../mongo/mongoDriver";

export async function initDBconnection() {
  const db = await MongoDriver.buildDriver();
  return db?.collection("donations");
}

export async function closeDbConnection() {
  const db = await MongoDriver.closeDriver();
}

export async function logDonation(args: {
  amount: string;
  firstName: string;
  lastName: string;
  city: string;
  State: string;
}) {
    try {
        const db = await initDBconnection();
        await db?.insertOne(args);
        closeDbConnection();
    } catch (error) {
        throw error;
    }
}


export async function fetchDonations() {
      try {
          const db = await initDBconnection();
          const donations = await db?.find();
          closeDbConnection();
          return donations
      } catch (error) {
          throw error;
      }
  }