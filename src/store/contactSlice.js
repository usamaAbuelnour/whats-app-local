import { createSlice } from "@reduxjs/toolkit";

const initialState = {name: null, room: null};

const contactSlice =createSlice({
    name: 'contact',
    initialState,
    reducers: {
        selectContact(state, action){
            return({...state, name: action.payload.name, room: action.payload.room});
        }
    }
});

export const {selectContact} = contactSlice.actions;
export default contactSlice.reducer;