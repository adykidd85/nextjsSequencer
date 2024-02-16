import styled from 'styled-components';

export const Container = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 60px;
	background: ${(props) => props.theme.colors.neutral.white};
	box-shadow: 0px 1px 1px 0px rgba(46, 59, 71, 0.2);
	padding: 0 24px;
`;
