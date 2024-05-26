import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

const initialState = {
    permissions: [],
    status: 'idle',
    error: null,
};

const fetchPermissions = createAsyncThunk('permissions/fetchPermissions', async (payload) => {
    const { authToken } = payload;
    const response = await fetch(`${BASE_URL}/permissions`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    });
    const data = await response.json();
    return data;
});

const permissionSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchPermissions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPermissions.fulfilled, (state, action) => {
                state.status = 'success';
                state.permissions = action.payload;
            })
            .addCase(fetchPermissions.rejected, (state, action) => {
                state.status = 'failure';
                state.error = action.error.message;
            });
    }
});

export const selectAllPermissions = (state) => state.permissions.permissions;
export const selectPermissionById = (state, permissionId) => state.permissions.permissions.find((permission) => permission.id === permissionId);

export { fetchPermissions };

export default permissionSlice.reducer;
