{/*
	This serves as the base layout structure for pages.
	It comes with a page header and a main element
	where page specific content is displayed.
*/}


import styled from "styled-components";
import COLORS from "../../utils/colors";
import { PAGE_HEADER_HEIGHT } from "../../utils/constants";


const PageScaffold = props => {
	return <Style>
		<header>
			<img 
				src="/img/logo-mpharma-textual.svg" 
				alt="mPharma"
				width="120"
			/>
		</header>

		<main>
			{/* displaying page specific content */}
			{ props.children }
		</main>
	</Style>
}


export default PageScaffold;


// page styling
const Style = styled.div`
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	background: ${COLORS.white};

	header, main {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	header {
		height: ${PAGE_HEADER_HEIGHT}px;
		background: ${COLORS.white};
		box-shadow: 0px 0px 2px ${COLORS.shadow};
	}

	main {
		height: calc(100vh - ${PAGE_HEADER_HEIGHT}px);
		overflow-x: hidden;
		overflow-y: auto;
	}
`;