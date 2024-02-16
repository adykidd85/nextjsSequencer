import React from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '@burstsms/react-components';

const Container = styled.div`
	position: absolute;
	height: 100vh;
	width: 100vw;
	top: 0;
	left: 0;
	z-index: 10;
	backdrop-filter: blur(2px);
	background-color: rgba(228, 228, 228, 0.4);
`;

const SpinnerStyled = styled.div`
	width: 100vw;
	display: flex;
	height: 100vh;
	flex-direction: column;
	justify-content: space-around;
`;

const CenterWrap = styled.div`
	postion: absolute;
`;

interface LoadingOverlay {
	children?: React.ReactNode;
}

const LoadingOverlay: React.FC<LoadingOverlay> = ({
	children,
}: LoadingOverlay) => {
	return (
		<>
			{children}
			<Container data-testid="loading-page">
				<CenterWrap>
					<SpinnerStyled>
						<LoadingSpinner />
					</SpinnerStyled>
				</CenterWrap>
			</Container>
		</>
	);
};

export default LoadingOverlay;
