import { combineReducers } from "redux";


const PRODUCT_LIST = (state = [], {type, payload}) => {
	switch (type) {
		case 'LOAD_PRODUCTS': return [...state, ...payload];
		case 'UPDATE_PRODUCTS': return [...payload];
		default: return state;
	}
};


const MAX_PRICE_ID = (state = 0, {type, payload}) => {
	switch (type) {
		case 'SET_MAX_PRICE_ID': return payload;
		default: return state;
	}
};


export const FEEDBACK = (state = { show: false }, action) => {
	switch (action.type) {
		case "CREATE_FEEDBACK":
			return { show: true, ...action.payload };
		case "DESTROY_FEEDBACK": return { show: false };
		default: return state;
	}
};


export default combineReducers({
	PRODUCT_LIST,
	MAX_PRICE_ID,
	FEEDBACK
});
