import { useState } from "react";
import GlobalStyle from "../src/views/globals/GlobalStyle";
import Meta from "../src/views/globals/Meta";
import PageScaffold from "../src/views/globals/PageScaffold";


const Index = props => {
	return <div>
		<Meta title='Products'/>
		<GlobalStyle />
		<PageScaffold>
			<img src="/img/logo-mpharma-graphic.png" alt="mPharma"/>
		</PageScaffold>
	</div>;
};


export default Index;