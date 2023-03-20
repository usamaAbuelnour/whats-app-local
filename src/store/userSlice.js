import { createSlice } from "@reduxjs/toolkit";

const initialState = {name: null, image: null};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addName(state, action){
            state.name = action.payload
        },
        addImg(state, action){

        }
    }
});
export const {addName, addImg} = userSlice.actions;
export default userSlice.reducer;