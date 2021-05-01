import { store } from "../../../pages/_app";
import { CREATE_FEEDBACK } from "../actions/ui";
import axios from "axios";


const AXIOS_FETCH = axios.create({
	timeout: 60000,
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
		"Accept": "application/json, text/plain, */*",
		"Access-Control-Allow-Origin": "*",
	}
})


export const HTTP_GET = ({
	url,
	successCallback, 
	errorCallback, 
	finalCallback
}) => {
	AXIOS_FETCH
	.get(url)
	.then(res => successCallback(res))
	.catch(err => CATCH_BLOCK(err, errorCallback))
	.finally(() => {
		if (finalCallback) finalCallback()
	})
};


// error handling
const CATCH_BLOCK = (err, callback) => {
	if (navigator.onLine) {
		if (err.response) {
			if (err.response.status < 304) {
				store.dispatch(
					CREATE_FEEDBACK({
						type: "error",
						message:
							"Bad internet connection. Please check your connection and try again.",
						selfDestruct: true,
					})
				);
			}
				
			callback(err.response.data.message);
		} 

		else callback(err.message);
	} 

	else {
		store.dispatch(
			CREATE_FEEDBACK({
				type: "error",
				message:
					"You are currently offline. Please connect to the internet and try again.",
				selfDestruct: true,
			})
		);
		callback();
	}
};
