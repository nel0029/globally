import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        darkMode: localStorage.getItem('darkMode') === 'true',
    },
    reducers: {
        setMode: (state) => {
            state.darkMode = !state.darkMode;
            localStorage.setItem('darkMode', String(state.darkMode)); // Convert boolean to string
        },
    },
});

export const { setMode } = themeSlice.actions;
export default themeSlice.reducer;
