import { useState } from "react";
import GlobalStyle from "../src/views/globals/GlobalStyle";
import Meta from "../src/views/globals/Meta";
import PageScaffold from "../src/views/globals/PageScaffold";
import { ButtonFilled } from "../src/views/globals/Buttons";
import ProductList from "../src/views/product/ProductList";
import ProductModal from "../src/views/modals/ProductModal";


const Index = props => {
	const [showAddNewPane, setShowAddNewPane] = useState(false);


	return <div>
		<Meta title='Products'/>
		<GlobalStyle />
		<PageScaffold>
			<main>
				<div className="container">
					{
						showAddNewPane ?
						<ProductModal
							show={showAddNewPane}
							title="add new product"
							dismiss={() => setShowAddNewPane(false)}
							action={{
								label: 'add product',
								commit: () => {}
							}}
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
		</PageScaffold>
	</div>;
};


export default Index;