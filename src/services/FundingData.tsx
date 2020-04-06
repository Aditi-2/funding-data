import axios from "axios";
import { IFundingObject } from "../model/ApiData";

export const getData = async (): Promise<IFundingObject[]> => {
  const response = await axios.get(
    `http://demo0377384.mockable.io/funding-test`
  );
  return response.data;
};
