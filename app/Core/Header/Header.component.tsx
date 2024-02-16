import React from 'react';
import { H5, Body2, PopoverMenu } from '@burstsms/react-components';
import {
	Container,
	Divider,
	InvisibleButton,
	ResponsiveHeaderContainer,
	RightSideDiv,
} from './Header.styles';

interface HeaderProps {
	title: string;
	name?: string;
	email?: string;
	logout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, name, email, logout }) => {
	return (
		<Container>
			<ResponsiveHeaderContainer>
				<H5>{title}</H5>
				<RightSideDiv data-testid="right-side">
					<Body2>{name}</Body2>
					<Divider>|</Divider>
					<PopoverMenu
						tabIndex={0}
						menuItems={[
							{
								key: 'first',
								text: 'Log out',
								onClick: logout,
							},
						]}
					>
						<InvisibleButton type="button">
							<Body2>{email}</Body2>
						</InvisibleButton>
					</PopoverMenu>
				</RightSideDiv>
			</ResponsiveHeaderContainer>
		</Container>
	);
};

export default Header;
