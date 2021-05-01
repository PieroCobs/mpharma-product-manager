import { Fragment, useState } from "react";
import { connect } from "react-redux";
import Spacer from "../globals/Spacer";
import ConfirmationModal from "../modals/ConfirmationModal";
import ProductModal from "../modals/ProductModal";
import Product from "./Product";
import { UPDATE_PRODUCTS } from "../../services/actions/products";
import { CREATE_FEEDBACK } from "../../services/actions/ui"


const ProductList = props => {
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
				props.PRODUCT_LIST.filter(
					product => !product.hasOwnProperty('deleted')
				).map(product => (
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
					No product to display. <br/>
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
						mainActionLabel="save changes"
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
									const indexOfProductInQuestion = props.PRODUCT_LIST.indexOf(productInQuestion);

									const products = props.PRODUCT_LIST;
									products[indexOfProductInQuestion] = productInQuestion;
									props.UPDATE_PRODUCTS(products);

									props.CREATE_FEEDBACK({
										type: 'success',
										message: `${productInQuestion.name} deleted.`
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
		UPDATE_PRODUCTS,
		CREATE_FEEDBACK
	}
)(ProductList);