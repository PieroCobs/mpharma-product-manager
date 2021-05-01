
export const FormatAsCurrency = (num) => {
	return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

/* ======================== FITLERS ===================== */
export const FindObjectByParam = (param, paramValue, objectList) => {
	const filteredList = objectList.filter((obj) => obj[param] === paramValue);

	if (filteredList.length > 0) return filteredList[0];
	return null;
};

export const FilterOutObjectByParam = (param, paramValue, objectList) => {
	const filteredList = objectList.filter((obj) => obj[param] !== paramValue);

	if (filteredList.length > 0) return filteredList;
	return null;
};