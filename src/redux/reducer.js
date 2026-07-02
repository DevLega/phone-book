import { ADD_CONTACT, DELETE_CONTACT, SET_FILTER } from './actions';

const STORAGE_KEY = 'contacts';

const initialState = {
    contacts: (() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ];
    })(),
    filter: '',
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTACT: {
            const updated = [...state.contacts, action.payload];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return { ...state, contacts: updated };
        }
        case DELETE_CONTACT: {
            const filtered = state.contacts.filter(c => c.id !== action.payload);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
            return { ...state, contacts: filtered };
        }
        case SET_FILTER:
            return { ...state, filter: action.payload };

        default:
            return state;
    }
};