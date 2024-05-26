import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

const initialState = {
    students: [],
    status: 'idle',
    error: null,
};

const fetchStudents = createAsyncThunk('students/fetchStudents', async (payload) => {
    const { authToken } = payload;
    const response = await fetch(`${BASE_URL}/students`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    });
    const data = await response.json();
    return data;
});

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.status = 'success';
                state.students = action.payload;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.status = 'failure';
                state.error = action.error.message;
            });
    }
});

export const selectAllStudents = (state) => state.students.students;
export const selectStudentById = (state, studentId) => state.students.students.find((student) => student.id === studentId);

export { fetchStudents };

export default studentSlice.reducer;
