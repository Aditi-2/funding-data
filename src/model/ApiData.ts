export enum ApiStatus {
    none = "none",
    pending = "pending",
    success = "success",
    error = "error",
  }

export interface IFundingObject {
    id: number;
    category: string;
    location: string;
    fundingAmount: number;
    announcedDate: string;
    [key: string] : string | number; // Create an index to access object values via string keys too
  }