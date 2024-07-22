import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../utlls/config.js";
import axios from "axios";

const BASE_URL = config.BASE_URL;
const TABLE_FILTERS = config.TABLE_FILTERS;

const initialState = {
  attendances: [],
  filters: TABLE_FILTERS,
  status: "idle",
};

const fetchAttendances = createAsyncThunk(
  "attendances/fetchAll",
  async (payload, { getState }) => {
    const state = getState();
    const { authToken, course_id, batch_id, date } = payload;
    const response = await axios.get(`${BASE_URL}/attendence`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      params: {
        ...state.attendance.filters,
        course_id,
        batch_id,
        date,
      }
    });
    return response.data;
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setQueryFilter(state, action) {
        state.filters.query = action.payload;
    },
    setPageFilter(state, action) {
        state.filters.page = action.payload;
    },
    setLimitFilter(state, action) {
        state.filters.page = 1;
        state.filters.limit = action.payload;
    },
    addAttendance: (state, action) => {
      state.attendances.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendances.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAttendances.fulfilled, (state, action) => {
        state.attendances = action.payload;
        state.status = "idle";
      })
      .addCase(fetchAttendances.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectAttendances = (state) => state.attendance.attendances;

export { fetchAttendances };
export const { setQueryFilter, setPageFilter, setLimitFilter } =
  attendanceSlice.actions;

export default attendanceSlice.reducer;
