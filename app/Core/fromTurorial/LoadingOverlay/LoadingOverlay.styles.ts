import styled from 'styled-components';

export const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
	backdrop-filter: blur(2px);
	background-color: rgba(228, 228, 228, 0.4);
	z-index: 10;
`;
