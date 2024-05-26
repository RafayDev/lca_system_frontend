import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

const initialState = {
    teachers: [],
    status: 'idle',
    error: null,
};

const fetchTeachers = createAsyncThunk('teachers/fetchTeachers', async (payload) => {
    const { authToken } = payload;
    const response = await fetch(`${BASE_URL}/teachers`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    });
    const data = await response.json();
    return data;
});

const teacherSlice = createSlice({
    name: 'teachers',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchTeachers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTeachers.fulfilled, (state, action) => {
                state.status = 'success';
                state.teachers = action.payload;
            })
            .addCase(fetchTeachers.rejected, (state, action) => {
                state.status = 'failure';
                state.error = action.error.message;
            });
    }
});

export const selectAllTeachers = (state) => state.teachers.teachers;
export const selectTeacherById = (state, teacherId) => state.teachers.teachers.find((teacher) => teacher.id === teacherId);

export { fetchTeachers };

export default teacherSlice.reducer;
