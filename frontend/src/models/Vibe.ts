// Web3
import { BigNumber } from "ethers";
import { blocktimeToDate } from "../utils/blocktimeUtils";

export default class Vibe {
  id: BigNumber;
  name: string;
  shortName: string;
  imageUrl: string;
  startDate: BigNumber;
  endDate: BigNumber;
  eventType: string;
  admins: string[];
  participantIds: BigNumber[];
  live: Boolean;

  constructor(data: any) {
    // Add validation checks for each property
    if (!(data.id instanceof BigNumber)) {
      throw new Error("Invalid id: should be an instance of BigNumber");
    }
    if (typeof data.name !== "string") {
      throw new Error("Invalid name: should be a string");
    }
    if (typeof data.shortName !== "string") {
      throw new Error("Invalid shortName: should be a string");
    }
    if (typeof data.imageUrl !== "string") {
      throw new Error("Invalid imageUrl: should be a string");
    }
    if (!(data.startDate instanceof BigNumber)) {
      throw new Error("Invalid id: should be an instance of BigNumber");
    }
    if (!(data.endDate instanceof BigNumber)) {
      throw new Error("Invalid id: should be an instance of BigNumber");
    }
    if (typeof data.eventType !== "string") {
      throw new Error("Invalid eventType: should be a string");
    }
    if (
      !Array.isArray(data.admins) ||
      !data.admins.every((str: string) => typeof str === "string")
    ) {
      throw new Error(
        "Invalid admin addresses: all elements should be strings"
      );
    }
    if (
      !Array.isArray(data.participantIds) ||
      !data.participantIds.every((id: BigNumber) => id instanceof BigNumber)
    ) {
      throw new Error(
        "Invalid id(s): all participant ids should be instances of BigNumber"
      );
    }

    this.id = data.id;
    this.name = data.name;
    this.shortName = data.shortName;
    this.imageUrl = data.imageUrl;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.eventType = data.eventType;
    this.admins = data.admins;
    this.participantIds = data.participantIds;
    this.live = data.live;
  }

  dateString = (): string => {
    return blocktimeToDate(this.endDate.toNumber());
  };
}
