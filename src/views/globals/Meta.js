import React from "react";
import Head from "next/head";

function Meta(props) {
	return (
		<Head>
			<title>{`${props.title ? props.title + " ·" : ""} mPharma Product Management Software`}</title>
			<meta name='description' content=''/>
			<meta
				name='viewport'
				content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
			/>
			<meta name='author' content='codycobs@outlook.com'/>
			<link rel='stylesheet' href='/css/bootstrap-grid.css'/>

			<link rel="preconnect" href="https://fonts.gstatic.com"/>
			<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"></link>
		</Head>
	);
}

export default Meta;
