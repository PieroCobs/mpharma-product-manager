{/*
	This serves as the base layout structure for pages.
	It comes with a header element
*/}


import styled from "styled-components";
import COLORS from "../../utils/colors";
import { PAGE_HEADER_HEIGHT } from "../../utils/constants";
import BarLoaderWrapper from "./BarLoaderWrapper";


const PageScaffold = props => {
	return <Style>
		<header>
			<img 
				src="/img/logo-mpharma-textual.svg" 
				alt="mPharma"
				width="120"
			/>

			{
				props.isLoading ? <BarLoaderWrapper/> : ''
			}
		</header>

		{props.children}
	</Style>
}


export default PageScaffold;


// page styling
const Style = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	background: ${COLORS.white};
	position: relative;

	header, main, footer {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	header, footer {
		flex: 0 0 auto;
		z-index: 20;
	}

	header {
		height: ${PAGE_HEADER_HEIGHT}px;
		background: ${COLORS.white};
		box-shadow: ${props => props.isLoading 
			? 'none'
			: '0px 1px 3px ' + COLORS.shadow
		};
		position: relative;
	}

	main {
		flex-grow: 1;
		overflow-x: hidden;
		overflow-y: auto;
		align-items: flex-start;
		padding: 28px 0 100px;

		@media (min-width: 64rem) {
			padding-top: 40px;
			padding-bottom: 120px;
		}
	}

	footer {
		background: rgb(255,255,255);
		background: linear-gradient(to bottom, rgba(255,255,255,.3) 0%, rgba(238,238,238,.5) 50%, rgba(238,238,238,8) 100%);
		padding: 24px 0;
		position: fixed;
		bottom: 0;

		@media (min-width: 64rem) {
			padding-top: 40px;
			padding-bottom: 40px;
		}

		img {
			margin-right: 8px;
			filter: invert(100%);
		}
	}
`;


export const PlaceholderFrame = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`;