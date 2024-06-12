import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { config } from "../utlls/config.js";
import axios from "axios";
import moment from "moment";

const BASE_URL = config.BASE_URL;

const initialState = {
  attendances: [],
  status: "idle",
};

const fetchAttendances = createAsyncThunk(
  "attendances/fetchAll",
  async (payload) => {
    const { authToken, course_id, batch_id, date, query } = payload;
    const response = await fetch(`${BASE_URL}/attendence?query=${query ? query : ""}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ course_id, batch_id, date: date ? moment(date).format("YYYY-MM-DD") : null }),
        });
        return response.json();
    }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
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

export default attendanceSlice.reducer;
