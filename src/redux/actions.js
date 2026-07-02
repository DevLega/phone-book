export const ADD_CONTACT = 'contacts/addContact';
export const DELETE_CONTACT = 'contacts/deleteContact';
export const SET_FILTER = 'contacts/setFilter';

export const addContact = (name, number) => ({
    type: ADD_CONTACT,
    payload: { id: Date.now(), name, number },
});

export const deleteContact = (id) => ({
    type: DELETE_CONTACT,
    payload: id,
});

export const setFilter = (value) => ({
    type: SET_FILTER,
    payload: value,
});