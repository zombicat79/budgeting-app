import { createSlice } from '@reduxjs/toolkit';

const storage = JSON.parse(sessionStorage.getItem('store'));
const initialState = storage?.projects ?? { current: {}, past: [] };

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action) => {
            state.current = action.payload;
        },
        closeProject: (state, action) => {
            state.past.push(state.current);
            state.current = {};
        }
    }
})

export const { addProject, closeProject } = projectSlice.actions;
export default projectSlice.reducer;