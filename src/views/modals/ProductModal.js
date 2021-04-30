import { ButtonFilled } from "../globals/Buttons";
import BaseModal from "./BaseModal";
import Spacer from "../globals/Spacer";
import InputField from "../globals/InputField";
import { useEffect, useState } from "react";


const ProductModal = props => {
	const [productName, setProductName] = useState('');
	const [productPrice, setProductPrice] = useState('');
	const [productNameError, setProductNameError] = useState(null);
	const [productPriceError, setProductPriceError] = useState(null);


	useEffect(() => {
		initiateInputs();
	}, [props.mode])


	const initiateInputs = () => {
		if (props.mode == 'edit') {
			const {name, prices} = props.product;
			setProductName(name);
			setProductPrice(prices[prices.length - 1].price);
		}
	}


	return <BaseModal 
		show={props.show}
		title={props.title}
		dismiss={props.dismiss}
	>
		<InputField
			label="Product Name"
			value={productName}
			onChange={e => {
				setProductName(e.target.value);
				if (e.target.value.trim() !== '') setProductNameError(null);
			}}
			onBlur={e => {
				if (e.target.value.trim() == '') 
					setProductNameError('Product name is required')
			}}
			inputClassName="text-capitalize"
			error={productNameError}
		/>

		<Spacer spaceY={16}/>

		<InputField
			label="Price"
			type="number"
			min="1.00"
			step="any"
			value={productPrice}
			onChange={e => {
				setProductPrice(e.target.value);
				if (e.target.value.toString().trim() !== '') 
					setProductPriceError(null);
			}}
			onBlur={e => {
				if (e.target.value.toString().trim() == '') 
					setProductPriceError('Product price is required')
			}}
			error={productPriceError}
		/>

		<Spacer spaceY={44}/>

		<div className="text-right">
			<ButtonFilled
				orange
				onClick={() => {
					if (
						productName.trim() !== '' && 
						productPrice.toString().trim() !== ''
					) {
						props.action.commit({
							name: productName,
							price: productPrice
						})
						setProductNameError(null);
						setProductPriceError(null);
					}
					else {
						if (productName.trim() === '') 
							setProductNameError('product name is required');
						if (productPrice.toString().trim() === '') 
							setProductPriceError('product price is required');
					}
				}}
			>
				{props.action.label}
			</ButtonFilled>
		</div>
	</BaseModal>
}


export default ProductModal;