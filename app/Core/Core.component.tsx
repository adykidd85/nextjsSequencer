import React from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import { useNavInfo } from 'router';
import { ThemeProps } from '@burstsms/react-components';
import GlobalStyle from './GlobalStyle';
import Header from './Header';
import SideNav from './SideNav';
import Breadcrumbs from './Breadcrumbs';

const Screen = styled.div`
	box-sizing: border-box;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: row;
	flex-flow: start;
	justify-content: flex-start;
	position: fixed;
`;

const VerticalLayout = styled.div`
	width: 100%;
	height: 100%;
	overflow: auto;
	display: flex;
	flex-direction: column;
	background: ${(props: ThemeProps) =>
		props.theme.colors.neutral.background.$1};
`;

const ViewContainer = styled.div`
	width: 100%;
	display: flex;
	flex-grow: 1;
	flex-flow: column;
`;

const Core: React.FC = () => {
	const { navInfo, setTitle, setCrumbTitle } = useNavInfo();
	return (
		<Screen>
			<GlobalStyle />
			<SideNav />
			<VerticalLayout>
				<Header navInfo={navInfo} />
				<ViewContainer>
					<Breadcrumbs navInfo={navInfo} />
					<Outlet context={{ navInfo, setTitle, setCrumbTitle }} />
				</ViewContainer>
			</VerticalLayout>
		</Screen>
	);
};

export default Core;
