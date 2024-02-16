import styled from 'styled-components';
import { ThemeProps, H2, Body1 } from '@burstsms/react-components';

export const ViewContainer = styled.div`
	width: calc(100vw - 58px);
	height: calc(100vh - 58px);
	overflow: auto;
	display: flex;
	flex-flow: column;
	background-color: ${(props: ThemeProps) =>
		props.theme.colors.neutral.background.$1};
`;

export const ErrorText = styled(H2)`
	display: flex;
	align-self: center;
`;

export const BodyText = styled(Body1)`
	display: flex;
	align-self: center;
	flex-wrap: wrap;
`;
