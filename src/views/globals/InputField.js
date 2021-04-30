import React from "react";
import styled from "styled-components";
import COLORS from "../../utils/colors";


const InputField = ({
	type,
	label,
	className,
	onChange,
	onFocus,
	onBlur,
	value,
	name,
	readOnly,
	disabled,
	error,
	min,
	max,
	minLength,
	maxLength,
	step,
	placeholder,
	hasDropdown,
	onKeyPress,
	inputClassName,
	id,
	tabIndex,
}) => {
	return (
		<Style
			className={className}
			type={type}
			hasPlaceholder={!!placeholder}
			hasLabel={!!label}
			hasDropdown={!!hasDropdown}
			error={error}
		>
			<input
				type={type ? type : "text"}
				name={name || id}
				value={value}
				onChange={onChange}
				required
				readOnly={readOnly || false}
				disabled={disabled || false}
				onFocus={onFocus}
				onBlur={onBlur}
				autoComplete='off'
				min={min}
				max={max}
				step={step}
				placeholder={placeholder}
				onKeyPress={onKeyPress}
				className={inputClassName}
				minLength={minLength}
				maxLength={maxLength}
				id={id}
				tabIndex={tabIndex}
			/>
			{label ? <label htmlFor={name || id}>{label}</label> : ""}
			<span className='error'>{error}</span>
		</Style>
	);
};


export default InputField;


const Style = styled.div`
	position: relative;
	height: 48px;
	flex-grow: 1;
	cursor: pointer;
	${props => props.hasPlaceholder ? "padding-top: 20px" : ""};

	input,
	label,
	.error {
		transition: all 200ms;
	}

	input {
		display: block;
		width: 100%;
		border: none;
		border-bottom: 1px solid ${props => props.error ? COLORS.error : COLORS.shadow};
		background: none;
		color: ${COLORS.blackDefault};
		font-size: 16px;
		position: absolute;
		bottom: 0;
		padding-bottom: 4px;
		border-radius: 0;
		transition: all 0.2s;
		z-index: 1;
		cursor: pointer;

		&:active, 
		&:focus {
			outline: none;
			border-color: ${props =>
				props.noBorderBottom 
				? "transparent" 
				: COLORS.brand
			};
		}

		&:focus,
		&:valid,
		&[readonly]:not([value=""]) {
			& + label {
				transform: ${(props) =>
					props.hasPlaceholder ? "translateY(-20px)" : "translateY(0px)"};
			}
		}

		&::placeholder {
			color: ${COLORS.blackAccentTwo};
			opacity: 1;
		}

		&:-ms-input-placeholder {
			color: ${COLORS.blackAccentTwo};
		}

		&::-ms-input-placeholder {
			color: ${COLORS.blackAccentTwo};
		}

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}

		&[type="number"] {
			-moz-appearance: textfield;
		}
	}

	label {
		display: block;
		text-transform: capitalize;
		font-size: 14px;
		color: ${COLORS.blackAccent};
		transform: ${(props) =>
			props.hasPlaceholder ? "translateY(-20px)" : "translateY(18px)"};
	}

	&.text-lowercase {
		input,
		textarea {
			text-transform: lowercase;
		}
	}
	&.text-capitalize {
		input,
		textarea {
			text-transform: capitalize;
		}
	}
	&.no-text-transform {
		input,
		textarea {
			text-transform: none;
		}
	}

	.error {
		display: block;
		color: ${COLORS.error};
		margin-top: ${(props) => (!props.hasPlaceholder ? "28px" : "8px")};
		${props => props.hasPlaceholder && !props.hasLabel ? "margin-top: 30px" : ""};
		text-transform: capitalize;
		font-size: 11px;
		text-align: left;
	}
`;
