import styled from "styled-components";
import COLORS from "../../utils/colors";
import { 
	CONTROLS_BORDER_RADIUS,
	CONTROLS_HEIGHT_SM,
	CONTROLS_HEIGHT_LG,
	CONTROLS_HEIGHT_MD,
	CONTROLS_PADDING_SM,
	CONTROLS_PADDING_LG,
	CONTROLS_PADDING_MD,

} from "../../utils/constants";


/* 
	Base styling for all button types
	button types are Filled, Outlined, Ghost
*/
const ButtonBaseStyle = styled.button`
	height: ${props => 
		props.sm || props.xsm
			? CONTROLS_HEIGHT_SM 
			: props.lg 
			? CONTROLS_HEIGHT_LG 
			: CONTROLS_HEIGHT_MD}px;

	width: ${props => props.fullWidth ? "100% !important" : "auto"};
	display: ${props => props.fullWidth ? "flex" : "inline-flex"};
	align-items: center;
	justify-content: center;

	padding: 0 ${props => 
		props.xsm
		? CONTROLS_PADDING_SM * 2/3 
			: props.sm 
			? CONTROLS_PADDING_SM 
			: props.lg 
			? CONTROLS_PADDING_LG 
			: CONTROLS_PADDING_MD}px;

	border-radius: ${CONTROLS_BORDER_RADIUS}px;
	border: none;
	outline: none;
	box-shadow: none;
	cursor: pointer;

	&, span {
		font-size: ${props => 
			props.sm 
				? 13 
				: props.lg 
				? 15 
				: 14}px;
		font-weight: 700;
		line-height: 1.2;
		text-transform: capitalize;
		transition: all .3s;
	}

	&:disabled {
		cursor: not-allowed;
		filter: saturate(50%) opacity(70%);
	}
`;


/* 
	Outlined button.
	has no background
	foreground and border colors are based on props
*/
export const ButtonOutlined = styled(ButtonBaseStyle)`
	background: none;
	border: 1px solid ${props =>
		props.orange
			? COLORS.brandOrange
			: props.black
			? COLORS.black
			: props.yellow
			? COLORS.brandYellow
			: COLORS.blackAccent};
	
	&, span {
		color: ${props =>
			props.orange
				? COLORS.brandOrange
				: props.black
				? COLORS.black
				: props.yellow
				? COLORS.brandYellow
				: COLORS.blackAccent};
	}
`;


/* 
	Ghost button.
	has no background nor border by default
	Shows mild background on hover
*/
export const GhostButton = styled(ButtonBaseStyle)`
	background: none;
	overflow: hidden;
	position: relative;
	font-weight: 700;
	z-index: 1;

	&, span {
		color: ${props =>
			props.orange
				? COLORS.brandOrange
				: props.black
				? COLORS.black
				: props.yellow
				? COLORS.brandYellow
				: COLORS.blackAccent};
	}

	&::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		opacity: 0.1;
		z-index: -1;
		transition: all .2s;
	}

	&:hover {
		&::after {
			background: ${props =>
				props.orange
					? COLORS.brandOrange
					: props.black
					? COLORS.black
					: props.yellow
					? COLORS.brandYellow
					: COLORS.blackAccent};
		}
	}
`;


/* 
	Filled button.
	background color is based on props
*/
export const ButtonFilled = styled(ButtonBaseStyle)`
	&, span {
		color: ${props =>
			props.orange || props.black
				? COLORS.white
				: COLORS.blackDefault};
	}
	background: ${props =>
		props.orange
			? COLORS.brandOrange
			: props.black
			? COLORS.black
			: props.yellow
			? COLORS.brandYellow
			: COLORS.blackAccent};
`;
