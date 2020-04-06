import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {GraphDataPoint} from "../../model/GraphData"
import {ApiStatus, IFundingObject} from "../../model/ApiData"

interface ChatState {
  fetchStatus: ApiStatus;
  apiData: IFundingObject[];
  categories: string[];
  fundingSum: GraphDataPoint[];
}

const initialState: ChatState = {
  fetchStatus: ApiStatus.none,
  apiData: [],
  categories: [],
  fundingSum: []
};

/**
 * Creates a slice to use with chart/funding component
 */
export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setStatus: (state: ChatState, action: PayloadAction<ApiStatus>) => {
      state.fetchStatus = action.payload;
      return state;
    },
    setApiData: (state: ChatState, action: PayloadAction<IFundingObject[]>) => {
      state.apiData = action.payload;
      return state;
    },
    extractCategories: (state) => {
      const categorySet = new Set<string>();
      for (let company of state.apiData) {
        categorySet.add(company.category);
      }
      state.categories = Array.from(categorySet);
      return state;
    },
    /**
     * Aggregate funding amount by category
     */
    aggregateData: (state) => {
      const groupData: GraphDataPoint[] = state.categories.map((category) => {
        /**
         * filter data by category
         */
        const categoryFilter = state.apiData.filter(
          (data) => data.category === category
        );
        /**
         * aggregate data for a given category
         */
        const sums = categoryFilter.reduce(
          (acc: number[], value) => {
            acc[0] += value.fundingAmount;
            acc[1] += 1;
            return acc;
          },
          [0, 0]
        );
        return {
          label: category,
          tableData: categoryFilter,
          y: sums[1],
          x: sums[0],
        };
      });
      state.fundingSum = groupData;
      return state;
    }
  }
});
