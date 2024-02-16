import React from 'react';
import { useAccount } from 'data/account';
import { useMatches } from 'react-router';
import { NavInfo, checkHasTitle } from 'router';
import { useAuth0 } from '@auth0/auth0-react';
import { paths } from 'router/Paths';
import HeaderComponent from './Header.component';

type HeaderProps = {
	navInfo: NavInfo;
};

const Header: React.FC<HeaderProps> = ({ navInfo }: HeaderProps) => {
	const { account } = useAccount();
	const matches = useMatches();
	const { logout } = useAuth0();
	const redirectLogout = () =>
		logout({
			logoutParams: {
				returnTo: `${window.location.origin}${paths.conversr.path}`,
			},
		});
	for (let i = matches.length - 1; i >= 0; i--) {
		const potentialMatch = matches[i]; // this makes the typechecker happy
		let title;

		if (checkHasTitle(potentialMatch)) {
			title = potentialMatch.handle.title;
			if (navInfo[potentialMatch.id]?.title) {
				title = navInfo[potentialMatch.id].title;
			}
		}

		if (title) {
			return (
				<HeaderComponent
					logout={redirectLogout}
					title={title}
					name={account?.company_name}
					email={account?.email}
				/>
			);
		}
	}
	return (
		<HeaderComponent
			logout={redirectLogout}
			title="Campaigns"
			name={account?.company_name}
			email={account?.email}
		/>
	);
};

export default Header;
