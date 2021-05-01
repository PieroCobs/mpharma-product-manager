import { BarLoader } from "react-spinners"
import styled from "styled-components";
import COLORS from "../../utils/colors";


const BarLoaderWrapper = ({position}) => {
	return <Style position={position}>
		<BarLoader
			height="2px"
			width="100%"
			color={COLORS.brandOrange}
		/>
	</Style>
}


export default BarLoaderWrapper;


const Style = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	height: 2px;
	z-index: 100;
	display: flex;
	align-items: center;
	${props => props.position == 'top'
		? 'top: 0'
		: 'bottom: 0'
	};
`;