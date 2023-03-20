import { createSlice } from "@reduxjs/toolkit";
import contacts from '../DB/contacts.json';
import { socket } from "../App";


const initialState = contacts;

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact(_, action){
            socket.emit('addContact', action.payload);
        },
        updateChatHistory(state, action){
            let contact = state.find(cont=>cont.name == action.payload.name);
            contact.userChatHistory = action.payload.chatHistory;
            let contactChatHistory = JSON.parse(JSON.stringify(action.payload.chatHistory));
            contactChatHistory.map(chat=>chat.you = !chat.you);
            contact.contactChatHistory = contactChatHistory;
            socket.emit('updateChatHistory', state);
        }
    }
});

export const {addContact, updateChatHistory} = contactsSlice.actions;
export default contactsSlice.reducer;