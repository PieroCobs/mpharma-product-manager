

export const GET_STORAGE_ITEM = (itemName, defaultValue) => {
	if (typeof (Storage) !== 'undefined') {
		if (typeof (localStorage[itemName]) !== 'undefined')
			return JSON.parse(localStorage.getItem(itemName));
	}
	return defaultValue || null;
};


export const SET_STORAGE_ITEM = (itemName, itemValue) => {
	if (typeof (Storage) !== 'undefined') {
		localStorage.setItem(itemName, JSON.stringify(itemValue));
		return JSON.parse(localStorage.getItem(itemName));
	}
	return itemValue;
};
