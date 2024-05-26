import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

const initialState = {
    roles: [],
    status: 'idle',
    error: null,
};

const fetchRoles = createAsyncThunk('roles/fetchRoles', async (payload) => {
    const { authToken } = payload;
    const response = await fetch(`${BASE_URL}/roles`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    });
    const data = await response.json();
    return data;
});

const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.status = 'success';
                state.roles = action.payload;
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.status = 'failure';
                state.error = action.error.message;
            });
    }
});

export const selectAllRoles = (state) => state.roles.roles;
export const selectRoleById = (state, roleId) => state.roles.roles.find((role) => role.id === roleId);

export { fetchRoles };

export default roleSlice.reducer;
