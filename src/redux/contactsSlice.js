import { createSlice, createSelector } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact, persistContacts } from './operations';

const initialState = {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    filter: '',
};

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchContacts
            .addCase(fetchContacts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ?? action.error.message;
            })

            // addContact
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.push(action.payload);
                persistContacts(state.items);
            })

            // deleteContact
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (contact) => contact.id !== action.payload
                );
                persistContacts(state.items);
            });
    },
});

export const { setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;

// Selectors

export const selectContacts = (state) => state.contacts.items;
export const selectStatus = (state) => state.contacts.status;
export const selectError = (state) => state.contacts.error;
export const selectFilter = (state) => state.contacts.filter;

export const selectFilteredContacts = createSelector(
    [selectContacts, selectFilter],
    (contacts, filter) =>
        contacts.filter((contact) =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        )
);
