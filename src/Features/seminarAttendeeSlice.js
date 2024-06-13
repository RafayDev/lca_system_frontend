import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createStandaloneToast } from "@chakra-ui/react";
import { config } from "../utlls/config.js";
import axios from 'axios';

const { toast } = createStandaloneToast();

const BASE_URL = config.BASE_URL;
const TABLE_FILTERS = config.TABLE_FILTERS;
const TABLE_PAGINATION = config.TABLE_PAGINATION;

const initialState = {
    seminarAttendees: [],
    filters: TABLE_FILTERS,
    pagination: TABLE_PAGINATION,
    fetchStatus: 'idle',
    error: null,
};

const fetchAttendeesBySeminar = createAsyncThunk('seminarAttendees/fetchAttendeesBySeminar', async (payload, { getState }) => {
    const state = getState();
    const { authToken, seminarId } = payload;
    const response = await axios.get(`${BASE_URL}/seminarAttendees/${seminarId}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        params: state.seminarAttendees.filters,
    });
    return response.data;
});

const seminarAttendeeSlice = createSlice({
    name: 'seminarAttendees',
    initialState,
    reducers: {
        resetAttendees: (state) => {
            state.seminarAttendees = [];
        },
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
    },
    extraReducers: (builder) => {
        builder
            // Fetch Seminar Attendees By Seminar ID
            .addCase(fetchAttendeesBySeminar.pending, (state) => {
                state.fetchStatus = 'loading';
            })
            .addCase(fetchAttendeesBySeminar.fulfilled, (state, action) => {
                state.fetchStatus = 'succeeded';
                state.seminarAttendees = action.payload.docs;
                state.pagination = {
                    totalDocs: action.payload.totalDocs,
                    limit: action.payload.limit,
                    totalPages: action.payload.totalPages,
                    page: action.payload.page,
                    pagingCounter: action.payload.pagingCounter,
                    hasPrevPage: action.payload.hasPrevPage,
                    hasNextPage: action.payload.hasNextPage,
                    prevPage: action.payload.prevPage,
                    nextPage: action.payload.nextPage,
                };
            })
            .addCase(fetchAttendeesBySeminar.rejected, (state, action) => {
                state.fetchStatus = 'failed';
                state.error = action.error.message;
                toast({
                    title: "Error",
                    description: action.error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    }
});

export const selectSeminarAttendees = (state) => state.seminarAttendees.seminarAttendees;

export { fetchAttendeesBySeminar };
export const { resetAttendees, setQueryFilter, setPageFilter, setLimitFilter } = seminarAttendeeSlice.actions;

export default seminarAttendeeSlice.reducer;
