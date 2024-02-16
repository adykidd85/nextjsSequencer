import styled from 'styled-components';

export const OuterContainer = styled.header`
	position: fixed;
	display: inline-block;
	min-width: 100%;
	background: #eee;
	z-index: 1000;
`;

export const InnerContainer = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 39px;
	font-family: Arial, Helvetica, sans-serif;
	font-weight: bold;
	font-size: 12px;
	line-height: 1.43;
	text-transform: uppercase;
	color: #000;
`;

export const Menu = styled.ul`
	list-style: none;
	display: flex;
	gap: 10px;
	margin: 0;
	padding: 0;

	a {
		display: inline-flex;
		color: inherit;

		&.active,
		&:hover {
			color: var(--theme-color-primary);
		}
	}
`;

export const AccountMenu = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

export const AccountName = styled.span`
	color: #9b9b9b;
`;

export const LogoutButton = styled.button.attrs(() => ({ type: 'button' }))`
	all: unset;
	cursor: pointer;
	margin-left: 7px;

	&:hover,
	&:focus {
		color: var(--theme-color-primary);
	}
`;

export const AccountBalanceContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4px;
	margin: 0 7px 0 15px;
`;

export const AccountBalance = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	height: 20px;
	min-width: 20px;
	font-weight: 400;
	font-size: 12px;
	line-height: 1.15;
	letter-spacing: 0.03em;
	color: #fff;
	background: #6aa537;
	padding: 0 6px;
	border-radius: 10px;
`;
