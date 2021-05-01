import { ButtonFilled } from "../globals/Buttons";
import BaseModal from "./BaseModal";
import Spacer from "../globals/Spacer";


const ConfirmationModal = props => {
	return <BaseModal 
		show={props.show}
		title={props.title}
		dismiss={props.dismiss}
	>
		{
			props.children
		}

		<Spacer spaceY={40}/>
		<div className="text-right">
			<ButtonFilled
				orange
				onClick={props.action.commit}
			>
				{props.action.label}
			</ButtonFilled>
		</div>
	</BaseModal>
}


export default ConfirmationModal;