import styled from 'styled-components';
import { ThemeProps } from '@burstsms/react-components';

export const ResponsiveHeaderContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
`;

export const Container = styled.div`
	position: relative;
	height: 58px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #fff;
	box-shadow: 0 1px 1px 0 rgba(46, 59, 71, 0.2);
	padding: 0 24px;
	position: sticky;
	top: 0;
	z-index: 10;
`;

export const RightSideDiv = styled.div`
	display: flex;
	align-items: center;
`;

export const Divider = styled.span`
	padding-left: 12px;
	padding-right: 8px;
`;

export const InvisibleButton = styled.button`
	all: unset;
	cursor: pointer;
	padding: 4px;
	border-radius: 4px;
	&:hover {
		background-color: ${(props: ThemeProps) =>
			props.theme.colors.neutral.background.$3};


`;
