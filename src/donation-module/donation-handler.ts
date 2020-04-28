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
    await MongoDriver.getInstance().logDonation(args);
  } catch (error) {
    throw error;
  }
}

export async function fetchDonations() {
  try {
    const donations = await MongoDriver.getInstance().findDonations();
    let donationSum = 0;
    for (const donation of donations) {
      donationSum += +donation.amount;
    }
    const mappedDonations = donations.map((donation) => {
      return {
        name: donation.name,
        amount: donation.amount,
      };
    });


    return {
      amount: donationSum,
      donations: mappedDonations,
    };
  } catch (error) {
    throw error;
  }
}
