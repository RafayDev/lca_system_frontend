import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

const initialState = {
    statistics: {},
    status: "idle",
    error: null,
};

const fetchStatistics = createAsyncThunk(
    "statistics/fetchStatistics",
    async (payload) => {
        const { authToken } = payload;
        const response = await fetch(`${BASE_URL}/statistics`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        const data = await response.json();
        return data;
    }
);

const statisticsSlice = createSlice({
    name: "statistics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch statistics
            .addCase(fetchStatistics.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchStatistics.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.statistics = action.payload;
            })
            .addCase(fetchStatistics.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export { fetchStatistics };

export default statisticsSlice.reducer;