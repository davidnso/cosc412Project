import { MongoDriver } from "../mongo/mongoDriver";

type donationParams = {
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
};

export async function initDBconnection() {
  const db = await MongoDriver.buildDriver();
  return db?.collection("donations");
}

export async function closeDbConnection() {
  const db = await MongoDriver.closeDriver();
}

export async function logDonation(args: {
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
    const donations: donationParams[] = await db?.find<donationParams>().toArray() as any;
    let donationSum = 0;
    for (const donation of donations) {
      donationSum += +donation.amount;
    }
    const mappedDonations = donations?.map((donation) => {
      donationSum += +donation.amount;
      return {
        name: donation.name,
        amount: donation.amount,
      };
    });
    
    closeDbConnection();

    return {
      amount: donationSum,
      donations: mappedDonations,
    };
    return donations;
  } catch (error) {
    throw error;
  }
}
