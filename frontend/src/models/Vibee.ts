// Web3
import { BigNumber } from "ethers";

export default class Vibee {
  vibe: BigNumber;
  viber: BigNumber;
  exists: Boolean;
  achievements: BigNumber;
  status: string;

  constructor(data: any) {
    // Add validation checks for each property
    if (!(data.vibe instanceof BigNumber)) {
      throw new Error("Invalid vibe: should be an instance of BigNumber");
    }
    if (!(data.viber instanceof BigNumber)) {
      throw new Error("Invalid viber: should be an instance of BigNumber");
    }
    if (!(data.achievements instanceof BigNumber)) {
      throw new Error(
        "Invalid achievements: should be an instance of BigNumber"
      );
    }
    if (typeof data.status !== "string") {
      throw new Error("Invalid status: should be a string");
    }

    this.vibe = data.vibe;
    this.viber = data.viber;
    this.exists = data.exists;
    this.achievements = data.achievements;
    this.status = data.status;
  }
}
