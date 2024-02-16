import styled, { css } from 'styled-components';

export interface ButtonProps {
	size?: 'small' | 'standard';
}

const buttonCommon = css<ButtonProps>`
	all: unset;
	display: flex;
	align-items: center;
	font-weight: ${(props) => (props.size === 'small' ? 400 : 600)};
	font-size: ${(props) => (props.size === 'small' ? '12px' : '14px')};
	line-height: ${(props) => (props.size === 'small' ? '18px' : '22px')};
	justify-content: center;
	color: #fff;
	background: var(--theme-color-primary);
	border: 1px solid var(--theme-color-primary);
	border-radius: 4px;
	padding: ${(props) => (props.size === 'small' ? '2px 7px' : '7px 19px')};
	cursor: pointer;

	&:hover,
	&:focus {
		color: var(--theme-color-primary);
		background: var(--theme-color-light);
	}
`;

export const Button = styled.button.attrs(() => ({ type: 'button' }))<ButtonProps>`
	${buttonCommon}
`;

export const LinkButton = styled.a<ButtonProps>`
	${buttonCommon}
`;
