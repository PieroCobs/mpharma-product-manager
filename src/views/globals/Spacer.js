
import React from "react";
import styled from "styled-components";


const Spacer = props => {
	return <Style
		spaceX={props.spaceX}
		spaceY={props.spaceY}
		spaceYsm={props.spaceYsm}
		className={props.className}
	>&nbsp;</Style>;
};


export default Spacer;


const Style = styled.div`
	display: ${props => props.spaceX || !props.spaceY ? 'inline' : 'block'};
	height: ${props => props.spaceY || 0}px;
	padding-right: ${props => props.spaceX || 0}px;
   background: transparent !important;

   @media (max-width: 64rem) {
      height: ${props => props.spaceYsm || props.spaceY || 0}px;
		padding-right: ${props => props.spaceXsm || props.spaceX || 0}px;
   }
`;