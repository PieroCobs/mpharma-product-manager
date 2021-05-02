import { Fragment, useState } from "react";
import { connect } from "react-redux";
import Spacer from "../globals/Spacer";
import ConfirmationModal from "../modals/ConfirmationModal";
import ProductModal from "../modals/ProductModal";
import Product from "./Product";
import { DELETE_PRODUCT } from "../../services/actions/products";
import { CREATE_FEEDBACK } from "../../services/actions/ui"


const ProductList = props => {
	// expanded holds the id of the currently expanded product component
	const [expanded, setExpanded] = useState(null);
	const [actionTracker, setActionTracker] = useState({
		isTriggered: false,
		actionType: '',
		product: null
	});


	const dismissModal = () => setActionTracker({
		isTriggered: false
	});


	return <div style={{
		maxWidth: 575,
		margin: '0 auto',
	}}>
		{
			props.PRODUCT_LIST.filter(
				product => !product.hasOwnProperty('deleted')
			).length > 0
			?
			<Fragment>
				<h5>Product List</h5>
				<Spacer spaceY={24}/>
			</Fragment>
			:
			''
		}

		{
			props.PRODUCT_LIST.filter(
				product => !product.hasOwnProperty('deleted')
			).length > 0 ?

				// since deleted items are still in state
				// filter out all undeleted items and display them
				props.PRODUCT_LIST.filter(
					product => !product.hasOwnProperty('deleted')
				)

				// loop over undeleted items and display them
				.map(product => (
					<Product
						key={product.id}
						name={product.name}
						prices={product.prices}
						onExpanded={() => {
							/*
							first on toggle of price history button on product component
							if expanded equals product id, price history for component
							is collapsed, otherwise, product id is passed to expanded
							*/
							expanded && expanded === product.id 
							? setExpanded(null)
							: setExpanded(product.id)
						}}
						isExpanded={expanded === product.id}

						/* 
						onActionTriggered fires on click of either the edit or delete buttons
						it receives the actionType — [delete || edit], 
						and the product on which the event was fired, for reference
						*/
						onActionTriggered={actionType => setActionTracker({
							isTriggered: true,
							actionType: actionType,
							product: product
						})}
					/>
				))
				:
				<div className="empty-bucket">
					No product to display. <br/>
					Click on the + button to add a new product
				</div>
		}

		{
			actionTracker.isTriggered ?
				// show edit modal if actionTracker.actionType is 'edit'
				actionTracker.actionType.toLowerCase() === 'edit' ?
					<ProductModal
						show={actionTracker.isTriggered}
						title="edit product"
						mode="edit"
						product={actionTracker.product}
						dismiss={dismissModal}
						mainActionLabel="save changes"
					/>
					:
						// show delete modal if actionTracker.actionType is 'delete'
						actionTracker.actionType.toLowerCase() === 'delete' ?
						<ConfirmationModal
							show={actionTracker.isTriggered}
							title="delete product"
							dismiss={dismissModal}
							action={{
								label: 'delete product',
								commit: () => {
									const productInQuestion = actionTracker.product;

									props.DELETE_PRODUCT(productInQuestion);

									props.CREATE_FEEDBACK({
										type: 'success',
										message: `${productInQuestion.name} deleted.`,
										selfDestruct: true
									})
									
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


const mapStateToProps = state => ({PRODUCT_LIST: state.PRODUCT_LIST})
export default connect(
	mapStateToProps,
	{
		DELETE_PRODUCT,
		CREATE_FEEDBACK
	}
)(ProductList);