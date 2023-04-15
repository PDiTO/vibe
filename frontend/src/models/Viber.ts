// Web3
import { BigNumber } from "ethers";

export default class Viber {
  id: BigNumber;
  name: string;
  vibes: BigNumber[];
  adminVibes: BigNumber[];

  constructor(data: any) {
    // Add validation checks for each property
    if (!(data.id instanceof BigNumber)) {
      throw new Error("Invalid id: should be an instance of BigNumber");
    }
    if (typeof data.name !== "string") {
      throw new Error("Invalid name: should be a string");
    }
    if (
      !Array.isArray(data.vibes) ||
      !data.vibes.every((id: BigNumber) => id instanceof BigNumber)
    ) {
      throw new Error(
        "Invalid id(s): all ids should be instances of BigNumber"
      );
    }
    if (
      !Array.isArray(data.adminVibes) ||
      !data.adminVibes.every((id: BigNumber) => id instanceof BigNumber)
    ) {
      throw new Error(
        "Invalid id(s): all ids should be instances of BigNumber"
      );
    }

    this.id = data.id;
    this.name = data.name;
    this.vibes = data.vibes;
    this.adminVibes = data.adminVibes;
  }
}
