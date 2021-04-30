import { useEffect, useState } from "react";
import Spacer from "../globals/Spacer";
import ConfirmationModal from "../modals/ConfirmationModal";
import ProductModal from "../modals/ProductModal";
import Product from "./Product";


const ProductList = () => {
	const [expanded, setExpanded] = useState(null);
	const [actionTracker, setActionTracker] = useState({
		isTriggered: false,
		actionType: '',
		product: null
	});


	const dismissModal = () => setActionTracker({
		isTriggered: false
	});


	const updateProductList = (index, updatedProduct) => {
		PRODUCTS[index] = updatedProduct;
	}


	return <div style={{
		maxWidth: 575,
		margin: '0 auto',
	}}>
		<h5>Product List</h5>
		<Spacer spaceY={24}/>

		{
			PRODUCTS.filter(product => !product.hasOwnProperty('deleted'))
			.length > 0 ?
				PRODUCTS.filter(product => !product.hasOwnProperty('deleted'))
				.map(product => (
					<Product
						key={product.id}
						name={product.name}
						prices={product.prices}
						onExpanded={() => {
							expanded && expanded === product.id 
							? setExpanded(null)
							: setExpanded(product.id)
						}}
						isExpanded={expanded === product.id}
						onActionTriggered={actionType => setActionTracker({
							isTriggered: true,
							actionType: actionType,
							product: product
						})}
					/>
				))
				:
				<div className="empty-bucket">
					Not product to display. <br/>
					Click on the + button to add a new product
				</div>
		}

		{
			actionTracker.isTriggered ?
				actionTracker.actionType.toLowerCase() === 'edit' ?
					<ProductModal
						show={actionTracker.isTriggered}
						title="edit product"
						mode="edit"
						product={actionTracker.product}
						dismiss={dismissModal}
						action={{
							label: 'save changes',
							commit: changes => {
								const productInQuestion = actionTracker.product;
								const indexOfProductInQuestion = PRODUCTS.indexOf(productInQuestion);

								const editedProduct = {
									id: productInQuestion.id,
									name: changes.name,
									prices: [...productInQuestion.prices]
								}

								if (changes.price != productInQuestion
									.prices[productInQuestion.prices.length - 1].price) {
										editedProduct.prices.push({
											id: productInQuestion.prices.length + 1,
											price: changes.price,
											date: Date.now()
										})
									}

								updateProductList(
									indexOfProductInQuestion,
									editedProduct
								)

								dismissModal();
							}
						}}
					/>
					:
						actionTracker.actionType.toLowerCase() === 'delete' ?
						<ConfirmationModal
							show={actionTracker.isTriggered}
							title="delete product"
							dismiss={dismissModal}
							action={{
								label: 'delete product',
								commit: () => {
									const productInQuestion = actionTracker.product;
									productInQuestion.deleted = true;
									const indexOfProductInQuestion = PRODUCTS.indexOf(productInQuestion);

									updateProductList(
										indexOfProductInQuestion, 
										productInQuestion
									)
									
									dismissModal();
								}
							}}
						>
							Are you sure you want to delete &nbsp; 
							<span className="text-700 text-capitalize">
								{actionTracker.product.name}
							</span>?
						</ConfirmationModal>
						: ''
						: ''
		}
	</div>
}


export default ProductList;


const PRODUCTS = [
	{
		id: 1,
		name: 'Ibuprofen 5mg',
		prices: [
			{
				id: 1,
				price: 10.99,
				date: "2020 04 02"
			},
			{
				id: 2,
				price: 12.99,
				date: "2020 12 30"
			},
			{
				id: 3,
				price: 14.99,
				date: "2021 02 12"
			}
		]
	},
	{
		id: 2,
		name: 'Chloramphenicol',
		prices: [
			{
				id: 4,
				price: 12.99,
				date: "2019 08 21"
			},
			{
				id: 5,
				price: 18.99,
				date: "2020 08 07"
			}
		]
	},
	{
		id: 3,
		name: 'Amoxclav',
		prices: [
			{
				id: 6,
				price: 24.99,
				date: "2019 04 21"
			}
		]
	},
	{
		id: 4,
		name: 'Diclonova',
		prices: [
			{
				id: 7,
				price: 36.99,
				date: "2019 08 21"
			},
			{
				id: 8,
				price: 40.99,
				date: "2020 08 07"
			}
		]
	},
	{
		id: 5,
		name: 'zylonta',
		prices: [
			{
				id: 9,
				price: 12.99,
				date: "2019 08 21"
			}
		]
	},
	{
		id: 6,
		name: 'jemperli',
		prices: [
			{
				id: 10,
				price: 12.99,
				date: "2019 08 21"
			},
			{
				id: 11,
				price: 18.99,
				date: "2020 08 07"
			}
		]
	},
	{
		id: 7,
		name: 'zegalogue',
		prices: [
			{
				id: 12,
				price: 12.99,
				date: "2019 08 21"
			},
			{
				id: 13,
				price: 18.99,
				date: "2020 08 07"
			},
			{
				id: 14,
				price: 17.99,
				date: "2019 07 12"
			}
		]
	},
	{
		id: 8,
		name: 'Azstarys',
		prices: [
			{
				id: 15,
				price: 12.99,
				date: "2019 08 21"
			},
			{
				id: 16,
				price: 18.99,
				date: "2020 08 07"
			}
		]
	}
]