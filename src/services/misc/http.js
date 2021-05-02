import { store } from "../../../pages/_app";
import { CREATE_FEEDBACK } from "../actions/ui";


const BASE_URL = "http://www.mocky.io/v2/";


export const HTTP_GET = async ({
	url,
	successCallback, 
	errorCallback,
}) => {
	fetch(BASE_URL + url)
		.then(response => {
			if (response.ok) return response.json();
			throw Error(response.statusText);
		})
		.then(result => successCallback(result.products))
		.catch(error => {
			CATCH_BLOCK();
			errorCallback(error.toString())
		})
};


// error handling
const CATCH_BLOCK = () => {
	if (!navigator.onLine) {
		store.dispatch(
			CREATE_FEEDBACK({
				type: "error",
				message:
					"You are currently offline. Please connect to the internet and try again.",
				selfDestruct: true,
			})
		);
	}
};
