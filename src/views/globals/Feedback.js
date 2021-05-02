import React, {useEffect} from "react"
import styled from "styled-components"
import { connect } from "react-redux";
import COLORS from "../../utils/colors";
import {
	slideLeftFadeInCss,
	slideRightFadeOutCss,
} from "../../utils/interactions/classes";
import { DESTROY_FEEDBACK } from "../../services/actions/ui";
import { CONTROLS_BORDER_RADIUS } from "../../utils/constants";


const Feedback = props => {
	useEffect(() => {
		if (props.selfDestruct) {
         const selfDismiss = setTimeout(
            () => props.DESTROY_FEEDBACK(),
            7000
         );
   
         return () => clearTimeout(selfDismiss);
      }
   }, [props.show]);
   

	return <Style
		shown={props.show}
		type={props.type}
	>
		<img src={props.type === 'error' 
			? '/img/error.svg' 
			: props.type === 'success' 
			? '/img/success.svg' 
			: props.type === 'warning' 
			? '/img/error.svg' 
			: '/img/info.svg'
		}
		     width={24}
		/>

		<div className="content">
			<span className="message">{props.message}</span>
		</div>

		<button onClick={() => props.DESTROY_FEEDBACK()}>OK</button>
	</Style>
};


const mapStateToProps = state => ({...state.FEEDBACK});
export default connect(
   mapStateToProps, 
   { 
      DESTROY_FEEDBACK 
   }
)(Feedback);


const Style = styled.section`
	display: flex;
	align-items: center;
	justify-content: space-between;
	visibility: ${props => props.shown ? 'visible' : 'hidden'};
	position: fixed;
	width: 90%;
	max-width: 360px;
	padding: 32px 32px 32px 24px;
	border-radius: ${CONTROLS_BORDER_RADIUS / 2}px;
	overflow: hidden;
	bottom: 20px;
	left: 5%;
	background: ${COLORS.white};
	box-shadow: 0 2px 4px rgba(0,0,0,.05), 0 12px 36px ${COLORS.shadow};
	animation-duration: .3s;
	${props => props.shown ? slideLeftFadeInCss : slideRightFadeOutCss};
	z-index: ${props => props.shown ? 99999 : -200} !important;

	@media (min-width: 575px) {
		left: 20px;
	}
	
	img, button {flex-grow: 0; flex-shrink: 0}
	.content {margin: 0 8px 0 24px; flex-grow: 1;}

	.message {
      display: block; 
      font-size: 13px; 
      line-height: 1.4;
   }  
	
	button {
		border: none;
		background: ${COLORS.white};
      flex-shrink: 0;
		padding: 8px 20px;
		font-size: 12px;
		color: ${COLORS.black};
		font-weight: 700;
		margin: 0 -12px;
		outline: none;
		cursor: pointer;
      margin-bottom: -12px;
      margin-right: -24px;
	}
`;