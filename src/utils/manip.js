
// number formatting
export const FormatAsCurrency = (num) => {
	return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

// filters 
export const FilterOutObjectByParam = (param, paramValue, objectList) => {
	const filteredList = objectList.filter((obj) => obj[param] !== paramValue);

	if (filteredList.length > 0) return filteredList;
	return null;
};