import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createStandaloneToast } from "@chakra-ui/react";
import { config } from "../utlls/config.js";

const { toast } = createStandaloneToast();

const BASE_URL = config.BASE_URL;

const initialState = {
  mcqs: [],
  fetchStatus: "idle",
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
  },
  query: "",
};


// Async thunk to fetch MCQs
export const fetchMcqs = createAsyncThunk("mcqs/fetchMcqs", async ({ authToken }) => {
  const response = await fetch("/api/mcqs", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const data = await response.json();
  return data;
});

// Async thunk to add a new MCQ
export const addMcq = createAsyncThunk("mcqs/addMcq", async ({ mcqData, authToken }) => {
  const response = await fetch("/api/mcqs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(mcqData),
  });
  const data = await response.json();
  return data;
});

// Async thunk to update an MCQ
export const updateMcq = createAsyncThunk("mcqs/updateMcq", async ({ mcqId, mcqData, authToken }) => {
  const response = await fetch(`/api/mcqs/${mcqId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(mcqData),
  });
  const data = await response.json();
  return data;
});

// Async thunk to delete an MCQ
export const deleteMcq = createAsyncThunk("mcqs/deleteMcq", async ({ mcqId, authToken }) => {
  const response = await fetch(`/api/mcqs/${mcqId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const data = await response.json();
  return data;
});

const mcqSlice = createSlice({
  name: "mcqs",
  initialState,
  reducers: {
    setLimitFilter: (state, action) => {
      state.pagination.limit = action.payload;
    },
    setPageFilter: (state, action) => {
      state.pagination.page = action.payload;
    },
    setQueryFilter: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMcqs.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchMcqs.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.mcqs = action.payload.mcqs;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchMcqs.rejected, (state) => {
        state.fetchStatus = "failed";
      })
      .addCase(addMcq.fulfilled, (state, action) => {
        state.mcqs.push(action.payload.mcq);
      })
      .addCase(updateMcq.fulfilled, (state, action) => {
        const index = state.mcqs.findIndex((mcq) => mcq._id === action.payload.mcq._id);
        if (index !== -1) {
          state.mcqs[index] = action.payload.mcq;
        }
      })
      .addCase(deleteMcq.fulfilled, (state, action) => {
        state.mcqs = state.mcqs.filter((mcq) => mcq._id !== action.payload.mcqId);
      });
  },
});

export const { setLimitFilter, setPageFilter, setQueryFilter } = mcqSlice.actions;
export const selectAllMcqs = (state) => state.mcqs;
export default mcqSlice.reducer;
