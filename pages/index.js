import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import GlobalStyle from "../src/views/globals/GlobalStyle";
import Meta from "../src/views/globals/Meta";
import PageScaffold, { PlaceholderFrame } from "../src/views/globals/PageScaffold";
import { ButtonFilled } from "../src/views/globals/Buttons";
import ProductList from "../src/views/product/ProductList";
import ProductModal from "../src/views/modals/ProductModal";
import { HTTP_GET } from "../src/services/misc/http";
import { CREATE_FEEDBACK } from "../src/services/actions/ui";
import { 
	LOAD_PRODUCTS, 
	SET_MAX_PRICE_ID,
} from "../src/services/actions/products";


const Index = props => {
	const [isLoading, setIsLoading] = useState(true);
	const [placeholderText, setPlaceholderText] = useState('Loading product list...');
	const [showAddNewPane, setShowAddNewPane] = useState(false);


	useEffect(() => {
		HTTP_GET(
			{
				url: 'http://www.mocky.io/v2/5c3e15e63500006e003e9795',
				successCallback: res => {
					const { products } = res.data;
					let priceList = [];

					// sorting price dates in descending order
					// this makes getting the most recent price 
					// more predictable
					products.forEach(product => {
						if (product.prices) {
							priceList = [...priceList, ...product.prices];

							product.prices.sort((a, b) => {
								return Date.parse(b.date) - Date.parse(a.date);
							})
						}
					});

					// getting the hightest price id
					priceList.sort((a, b) => {
						return b.id - a.id;
					});

					props.SET_MAX_PRICE_ID(priceList[0]['id'])
					props.LOAD_PRODUCTS(products);
					setPlaceholderText(null);
				},
				errorCallback: () => {
					setPlaceholderText(
						'Could not fetch product list. Please try again later.'
					);
				},
				finalCallback: () => setIsLoading(false)
			}
		)
	}, [])


	return <div>
		<Meta title='Products'/>
		<GlobalStyle />
		<PageScaffold isLoading={isLoading}>
			{
				!isLoading ?
					!placeholderText ?
						<Fragment>
							<main>
								<div className="container">
									{
										showAddNewPane ?
										<ProductModal
											show={showAddNewPane}
											title="add new product"
											dismiss={() => setShowAddNewPane(false)}
											mainActionLabel="add product"
										/>
										:
										''
									}
									<ProductList/>
								</div>
							</main>

							{
								!showAddNewPane ?
									<footer>
										<ButtonFilled
											orange
											onClick={() => setShowAddNewPane(true)}
										>
											<img 
												src="/img/plus.svg" 
												alt="+"
												width="16"
											/>
											Add New Product
										</ButtonFilled>
									</footer>
									:
									''
							}
						</Fragment>
						:
						<PlaceholderFrame>
							{placeholderText}
						</PlaceholderFrame>
						:
					<PlaceholderFrame>
						{placeholderText}
					</PlaceholderFrame>
			}
		</PageScaffold>
	</div>;
};


const mapStateToProps = () => ({});
export default connect(
	mapStateToProps,
	{ 
		CREATE_FEEDBACK,
		LOAD_PRODUCTS,
		SET_MAX_PRICE_ID,
	}
)(Index);