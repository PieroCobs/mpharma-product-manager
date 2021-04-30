
import styled from "styled-components";
import COLORS from "../../utils/colors";
import { 
	fadeInCss, 
	fadeOutCss, 
	zoomInFadeInCss, 
	zoomOutFadeOutCss 
} from "../../utils/interactions/classes";


const BaseModal = props => {
	return <Style show={props.show}>
		<div className="dialog">
			<button
				className="dismiss-button"
				onClick={props.dismiss}
			>
				<img 
					src="/img/cancel.svg" 
					alt="Cancel" 
					width={12}
				/>
			</button>
			<h6 className="title">{props.title}</h6>
			{props.children}
		</div>

		<div onClick={props.dismiss} className="backdrop"></div>
	</Style>
}


export default BaseModal;


const Style = styled.div`
	position: fixed;
	display: ${props => props.show ? "flex" : "none"};
	align-items: center;
	justify-content: center;
	z-index: 100;

	.title {
		text-transform: capitalize;
		margin-bottom: 28px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&, .backdrop {
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
	}

	.dialog {
		background: ${COLORS.white};
		padding: 40px 28px;
		width: 90%;
		max-width: 400px;
		position: relative;
		animation-duration: .2s;
		${props => props.show ? zoomInFadeInCss : zoomOutFadeOutCss};

		@media (min-width: 64rem) {
			padding: 40px 56px;
		}
	}

	.dismiss-button {
		position: absolute;
		right: 0;
		top: 0;
		padding: 16px 20px;
		cursor: pointer;

		img { opacity: 0.6; }
	}

	.backdrop {
		background: ${COLORS.blackHalf};
		position: absolute;
		z-index: -1;
		animation-duration: .1s;
		${props => props.show ? fadeInCss : fadeOutCss};
	}
`;