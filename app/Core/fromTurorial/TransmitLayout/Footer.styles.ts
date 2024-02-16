import styled from 'styled-components';

export const Container = styled.footer`
	padding: 40px 0;
`;

export const Menu = styled.ul`
	list-style: none;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 40px;
	margin: 0;
	padding: 0;

	a {
		display: inline-flex;
		font-family: Arial, Helvetica, sans-serif;
		font-weight: 400;
		font-size: 12px;
		line-height: 18px;
		color: var(--theme-color-primary);
	}
`;
