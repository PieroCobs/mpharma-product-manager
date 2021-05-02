import { ButtonFilled } from "../globals/Buttons";
import BaseModal from "./BaseModal";
import Spacer from "../globals/Spacer";
import InputField from "../globals/InputField";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { 
	UPDATE_PRODUCT,
	ADD_PRODUCT,
	SET_MAX_PRICE_ID 
} from "../../services/actions/products";
import { 
	CREATE_FEEDBACK,
} from "../../services/actions/ui";


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
			setProductPrice(prices[0].price);
		}
	}


	const handleSubmit = e => {
		e.preventDefault();

		if (
			productName.trim() !== '' && 
			productPrice.toString().trim() !== ''
		) {
			// save new product to state
			if (props.mode !== 'edit') {
				props.ADD_PRODUCT(
					{
						id: props.PRODUCT_LIST.length + 1,
						name: productName,
						prices: [
							{
								id: props.MAX_PRICE_ID + 1,
								price: parseFloat(productPrice),
								date: Date.now()
							}
						]
					}
				);

				props.SET_MAX_PRICE_ID(props.MAX_PRICE_ID + 1);

				props.CREATE_FEEDBACK({
					type: 'success',
					message: `${productName} saved`,
					selfDestruct: true,
				})
			}

			// save a product editing
			else {
				const productInQuestion = props.product;
				const productInQuestionLastPrice = productInQuestion.prices[0].price

				const editedProduct = {
					...productInQuestion,
					name: productName
				}

				// update product price if the price was changed
				if (productPrice != productInQuestion.prices[0].price) {
					editedProduct.prices.unshift({
						id: props.MAX_PRICE_ID + 1,
						price: parseFloat(productPrice),
						date: Date.now()
					})

					props.SET_MAX_PRICE_ID(props.MAX_PRICE_ID + 1)
				}

				// updating store
				props.UPDATE_PRODUCT({
					oldProduct: productInQuestion,
					newProduct: editedProduct
				});

				if (
					productName.trim() !== productInQuestion.name ||
					productPrice != productInQuestionLastPrice
				) {
					props.CREATE_FEEDBACK({
						type: 'success',
						message: `${productName} udpated`,
						selfDestruct: true,
					})
				}
			}

			setProductNameError(null);
			setProductPriceError(null);
			props.dismiss();
		}
		else {
			if (productName.trim() === '') 
				setProductNameError('product name is required');
			if (productPrice.toString().trim() === '') 
				setProductPriceError('product price is required');
		}
	}


	return <BaseModal 
		show={props.show}
		title={props.title}
		dismiss={props.dismiss}
	>
		<form onSubmit={handleSubmit}>
			<InputField
				autoFocus
				label="Product Name"
				value={productName}
				maxLength={80}
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
					onClick={handleSubmit}
					type="submit"
				>
					{props.mainActionLabel}
				</ButtonFilled>
			</div>
		</form>
	</BaseModal>
}


const mapStateToProps = state => ({
	PRODUCT_LIST: state.PRODUCT_LIST,
	MAX_PRICE_ID: state.MAX_PRICE_ID,
});
export default connect(
	mapStateToProps,
	{
		UPDATE_PRODUCT,
		ADD_PRODUCT,
		SET_MAX_PRICE_ID,
		CREATE_FEEDBACK
	}
)(ProductModal);