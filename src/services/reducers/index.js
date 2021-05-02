
/* 
contains all reducers and the export combinedReducers
*/

import { combineReducers } from "redux";
import { FilterOutObjectByParam } from "../../utils/manip";
import { 
   GET_STORAGE_ITEM, 
   SET_STORAGE_ITEM 
} from "../misc/webStorage";


// reducer for products
const PRODUCT_LIST = (
	/*
	state gets its initial value from localStorage
	using the key 'products'
	*/
	state = [...GET_STORAGE_ITEM('products', [])], 
	{type, payload}
) => {
	switch (type) {
		case 'LOAD_PRODUCTS': 
			/*
			load initial products
			calls SET_STORAGE_ITEM to save items in localStorage
			*/
			return SET_STORAGE_ITEM(
				'products', 
				[...payload]
			);

		case 'ADD_PRODUCT':
			/* 
			add new product to app state
			prepends the new product to store
			making it the first item in the list
			*/
			return SET_STORAGE_ITEM(
				'products',
				[
					{...payload}, 
					...state
				]
			);

		case 'DELETE_PRODUCT':
			/*
			filter out the item to be deleted
			so we can have the unaffected items
			*/
			const unaffectedProducts = FilterOutObjectByParam(
				'id',
				payload.id,
				[...state]
			);

			/* 
			sets new store value by adding `deleted: true` property to
			the item to be deleted and then append it to the 
			unaffected products.
			products with the `deleted` property won't display for users
			but they can be accessed in the store/archive for 
			reference purposes
			*/
			return SET_STORAGE_ITEM(
				'products',
				[
					...unaffectedProducts,
					{
						...payload,
						deleted: true
					}
				]
			)

		case 'UPDATE_PRODUCT':
			/* 
			this case handles editing a product
			it takes two parameters:
			oldProduct -> details of the product to be edited as it currently is in state
			and newProduct -> oldProduct updated with changes
			*/
			const productList = [...state];

			/* 
			old product is used to find the position of the item to be edited in state
			so it doesn't change position after changes are applied
			*/
			const indexOfProduct = productList.indexOf(payload.oldProduct);

			/* 
			oldProduct's position is updated with changes
			and written to store
			*/
			productList[indexOfProduct] = {...payload.newProduct};

			return SET_STORAGE_ITEM(
				'products', 
				[...productList]
			);

		default: return state;
	}
};

// reducer for the price with the highest id among all the products
const MAX_PRICE_ID = (
	state = GET_STORAGE_ITEM('maxPriceId', 0), 
	{type, payload}
) => {
	switch (type) {
		case 'SET_MAX_PRICE_ID': 
			return SET_STORAGE_ITEM('maxPriceId', payload);
		default: return state;
	}
};


// reducer for the feedback popup
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
