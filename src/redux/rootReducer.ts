import {combineReducers} from "@reduxjs/toolkit";
import {chartSlice} from "./slices/chartSlice";

export const rootReducer = combineReducers({
    chart: chartSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>;