
import { SquareButton, type ThemeProps } from '@burstsms/react-components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SideNavContainer = styled.div`
	height: 100vh;
	width: 64px;
	padding: 0 0 0 8px;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	background-color: ${(props: ThemeProps) =>
		props.theme.colors.neutral.lightGrey.$3};
	border: solid 1px #eaecf0;
	box-shadow: 1px 0 1px 0 #e3e3e3;
	z-index: 1;
`;

export const InsideLink = styled(Link)`
	margin-top: 24px;
	display: block;
	&.logo {
		align-self: center;
	}
`;

export const OutsideLink = styled.a`
	margin-top: 24px;
	display: block;
`;

export const LogoLink = styled(InsideLink)`
	padding: 0 20px 0 12px;
`;

interface SideNavButtonProps {
	$isActive?: boolean;
}

export const SideNavButton = styled(SquareButton)<SideNavButtonProps>`
	width: 56px;
	height: 48px;
	border-radius: 4px 0 0 4px;
	background-color: transparent;
	color: ${(props: ThemeProps) => props.theme.colors.neutral.lightGrey.$10};
	&.active {
		background-color: ${(props: ThemeProps) =>
			props.theme.colors.neutral.lightGrey.$1} !important;
		// some icons are built with a mask, so we need to make the fill is white
		g {
			mask {
				path {
					fill: ${(props: ThemeProps) => props.theme.colors.neutral.white};
				}
			}
		}
	}

	// this shows active as blue, inactive as grey
	path {
		fill: ${(props: SideNavButtonProps & ThemeProps) =>
			props.$isActive
				? props.theme.colors.primary.blue.$7
				: props.theme.colors.neutral.lightGrey.$10};
	}

	&:hover,
	&:focus-visible {
		background-color: ${(props: ThemeProps) =>
			props.theme.colors.neutral.lightGrey.$3};
		path {
			fill: ${(props: ThemeProps) => props.theme.colors.primary.blue.$7};
		}
	}
	&:focus {
		box-shadow: none;
	}
`;
