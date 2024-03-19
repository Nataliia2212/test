import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filterChange: '',
  },
  reducers: {
    filterContacts(state, action) {
      state.filterChange = action.payload;
    },
  },
  selectors: {
    selectFilter: state => state.filterChange,
  },
});

export const filterReducer = filterSlice.reducer;
export const filterContacts = filterSlice.actions.filterContacts;
export const { selectFilter } = filterSlice.selectors;
