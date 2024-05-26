import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

const initialState = {
    users: [],
    status: 'idle',
    error: null,
};

const fetchUsers = createAsyncThunk('users/fetchUsers', async (payload) => {
    const { authToken } = payload;
    const response = await fetch(`${BASE_URL}/users`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    });
    const data = await response.json();
    return data;
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'success';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failure';
                state.error = action.error.message;
            });
    }
});

export const selectAllUsers = (state) => state.users.users;
export const selectUserById = (state, userId) => state.users.users.find((user) => user.id === userId);

export { fetchUsers };

export default userSlice.reducer;
