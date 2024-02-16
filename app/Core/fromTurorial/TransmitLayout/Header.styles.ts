import { Badge } from '@burstsms/react-components';
import styled from 'styled-components';

export const Hero = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-family: Arial, Helvetica, sans-serif;
	padding: 90px 0 20px;

	> a {
		display: inline-flex;
	}
`;

export const AccountHeader = styled.h1`
	font-weight: 700;
	font-size: 26px;
	color: var(--theme-color-primary);
	margin: 0;
`;

export const H1 = styled.h1`
	font-weight: 400;
	font-size: 22px;
	text-transform: uppercase;
	color: #3b3b3b;
	margin: 0;
`;

export const Menu = styled.ul`
	list-style: none;
	display: flex;
	align-items: stretch;
	justify-content: space-between;
	margin: 0;
	padding: 0;
	font-family: Arial, Helvetica, sans-serif;
	border-bottom: 1px solid #ccc;
`;

export const MenuLink = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 12px;
	position: relative;
	font-size: 13px;
	height: 48px;
	width: 100%;
	line-height: 1.08;
	text-transform: uppercase;
	color: inherit;

	&:hover,
	&.active {
		color: var(--theme-color-primary);

		&::after {
			content: '';
			position: absolute;
			height: 3px;
			background-color: var(--theme-color-primary);
			bottom: -2px;
			left: 4px;
			right: 4px;
		}
	}

	// Hack to get InboxSolidMail icon color to update, including hover state
	svg g[mask] {
		fill: currentColor;
	}
`;

export const MenuItem = styled.li`
	flex: 1;
`;

export const BadgeStyled = styled(Badge).attrs(() => ({ size: 'small', variant: 'green' }))`
	margin-left: -2px;
`;
