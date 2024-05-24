import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

const initialState = {
    batches: [],
    status: 'idle',
    error: null,
};

const fetchBatches = createAsyncThunk('batches/fetchBatches', async (payload) => {
    const { authToken } = payload;
    const response = await fetch(`${BASE_URL}/batches`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    });
    const data = await response.json();
    return data;
});

const batchSlice = createSlice({
    name: 'batches',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchBatches.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBatches.fulfilled, (state, action) => {
                state.status = 'success';
                state.batches = action.payload;
            })
            .addCase(fetchBatches.rejected, (state, action) => {
                state.status = 'failure';
                state.error = action.error.message;
            });
    }
});

export const selectAllBatches = (state) => state.batches.batches;
export const selectBatchById = (state, batchId) => state.batches.batches.find((batch) => batch.id === batchId);

export { fetchBatches };

export default batchSlice.reducer;