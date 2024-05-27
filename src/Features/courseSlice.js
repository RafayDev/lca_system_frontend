import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

const initialState = {
    courses: [],
    status: 'idle',
    error: null,
};

const fetchCourses = createAsyncThunk('courses/fetchCourses', async (payload) => {
    const { authToken } = payload;
    const response = await fetch(`${BASE_URL}/courses`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    });
    const data = await response.json();
    return data;
});

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.status = 'success';
                state.courses = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.status = 'failure';
                state.error = action.error.message;
            });
    }
});

export const selectAllCourses = (state) => state.courses.courses;

export { fetchCourses };

export default courseSlice.reducer;