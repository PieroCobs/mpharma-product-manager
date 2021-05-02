import styled from "styled-components";
import COLORS from "../../utils/colors";
import { GhostButton } from "../globals/Buttons";
import moment from "moment";
import { FormatAsCurrency } from "../../utils/manip";


const Product = props => {
	return <Style
		isExpanded={props.isExpanded}
	>
		<div className="head">
			<div className="details">
				<h6 className="product-name">{props.name}</h6>

				<span className="current-price">
					{/* show current price as first item in the prices props */}
					ghs {
						FormatAsCurrency(props.prices[0].price)
					}
				</span>
			</div>

			<div className="controls">
				<GhostButton
					xsm
					title="Edit"
					className="show-lg-on-hover"
					onClick={() => props.onActionTriggered("edit")}
				>
					<img src="/img/pencil.svg" alt="Edit"/>
				</GhostButton>

				<GhostButton
					xsm
					title="Delete"
					className="show-lg-on-hover"
					onClick={() => props.onActionTriggered("delete")}
				>
					<img src="/img/delete_fill.svg" alt="Delete"/>
				</GhostButton>
				
				<GhostButton
					xsm
					// toggle price history on click
					onClick={props.onExpanded}
				>
					<span className="label">Price history</span>
					<img src="/img/down_arrow.svg" alt="Toggle"/>
				</GhostButton>
			</div>
		</div>


		{/* show price history if isExpanded is true */}
		{
			props.isExpanded ?
			<div className="history">
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{
							props.prices.map(price => (
								<tr key={price.id}>
									<td>
										{
											moment(price.date).format("D MMM YYYY, HH:mm:ss")
										}
									</td>
									<td>
										{
											FormatAsCurrency(price.price)
										}
									</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
			:
			''
		}
	</Style>
}


export default Product;


const Style = styled.div`
	padding: 16px 12px;
	transition: all 500ms;
	background: ${props => props.isExpanded 
		? COLORS.white 
		: COLORS.white};
	border: 1px solid ${COLORS.shadowAlt};
	box-shadow: ${props => props.isExpanded 
		? '0px 4px 16px ' + COLORS.shadow
		: 'none'};

	&:not(:last-child) { margin-bottom: 24px;}
	
	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.details {
		max-width: 60%;
	}

	.controls {
		white-space: nowrap;
		background: ${COLORS.white};
	}

	.product-name {
		font-size: 16px;
		text-transform: capitalize;
	}

	.current-price {
		text-transform: uppercase;
		color: ${COLORS.blackAccent}
	}

	button {
		img {
			filter: brightness(0%) invert(70%);
			width: 12px;
		}

		.label {
			display: none;
			margin-right: 4px;

			& + img {
				transform: rotate(${props => props.isExpanded ? 180 : 0}deg)
			}
		}
	}

	.history {
		margin-top: 16px;
		border-top: 1px solid ${COLORS.shadowAlt};
	}

	@media (min-width: 64rem) {
		.show-lg-on-hover {
			display: ${props => props.isExpanded 
				? ''
				: 'none'};
		}
		
		&:hover {
			.show-lg-on-hover { display: inline-block; }
		}

		button {
			.label { 
				display: inline-block; 
				& + img { width: 10px; }
			}
		}
	}
`;