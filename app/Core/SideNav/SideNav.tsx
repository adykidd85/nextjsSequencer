import { IconType, Tooltip } from '@burstsms/react-components';
import { useAccount } from 'data/account';
import React, { useMemo } from 'react';
import { useMatch } from 'react-router';
import { externalPaths, injectPathParams, paths } from 'router/Paths';
import env from 'utils/env';
import {
	InsideLink,
	LogoLink,
	OutsideLink,
	SideNavButton,
	SideNavContainer,
} from './SideNav.styles';
import { ReactComponent as Logo } from './logo.svg';

interface InternalLink {
	title?: string;
	to: string;
	isActive?: boolean;
	className?: string;
	dataTestId: string;
	activeIcon: IconType;
	inActiveIcon: IconType;
}

interface ExternalLink {
	title?: string;
	href: string;
	className?: string;
	dataTestId: string;
	activeIcon: IconType;
	inActiveIcon: IconType;
	tooltipIcon?: IconType;
}

const SideNav: React.FC = () => {
	const isCampaignsPage = useMatch(paths.campaigns.path);
	const isCampaignReportPage = useMatch(paths.campaignReport.path);
	const isCreateCampaignPage = useMatch(paths.createCampaign.path);
	const isCampaignTypesPage = useMatch(paths.campaignTypes.path);
	const { account } = useAccount();
	const subdomain =
		account?.parent?.subdomain ?? env.REACT_APP_FALLBACK_SUBDOMAIN;

	const internalLinks = useMemo(() => {
		const links: Array<InternalLink> = [
			{
				title: 'Campaigns',
				to: paths.campaigns.path,
				dataTestId: 'link-campaigns',
				isActive:
					!!isCampaignsPage || !!isCreateCampaignPage || !!isCampaignReportPage,
				activeIcon: 'ShareSolidMegaphone',
				inActiveIcon: 'ShareOutlineMegaphone',
			},
			{
				title: 'Campaign Types',
				to: paths.campaignTypes.path,
				dataTestId: 'link-campaign-types',
				isActive: !!isCampaignTypesPage,
				activeIcon: 'ArrowsSolidAutomationFlow',
				inActiveIcon: 'ArrowsOutlineAutomationFlow',
			},
		];
		return links;
	}, [
		isCampaignReportPage,
		isCampaignTypesPage,
		isCampaignsPage,
		isCreateCampaignPage,
	]);

	const externalLinks = useMemo(() => {
		const links: Array<ExternalLink> = [
			{
				title: 'Contact list',
				href: injectPathParams(externalPaths.contacts, { subdomain }),
				dataTestId: 'link-contacts',
				activeIcon: 'UserSolidProfileUsers',
				inActiveIcon: 'UserOutlineProfileUsers',
				tooltipIcon: 'ArrowsOutlineExternalLink',
			},
			{
				title: 'Settings',
				href: injectPathParams(externalPaths.profile, { subdomain }),
				dataTestId: 'link-settings',
				tooltipIcon: 'ArrowsOutlineExternalLink',
				activeIcon: 'SettingSolidCog',
				inActiveIcon: 'SettingOutlineCog',
			},
		];
		return links;
	}, [subdomain]);

	return (
		<SideNavContainer>
			<LogoLink
				to={paths.campaigns.path}
				className="logo"
				data-testid="link-logo"
			>
				<Logo />
			</LogoLink>
			{internalLinks.map((link: InternalLink) => (
				<Tooltip text={link.title ? link.title : ''} offset={3} key={link.to}>
					<InsideLink to={link.to} data-testid={link.dataTestId}>
						<SideNavButton
							title={link.title ? link.title : ''}
							aria-label={link.title ? link.title : ''}
							$isActive={link.isActive}
							className={link.isActive ? 'active' : ''}
							icon={link.isActive ? link.activeIcon : link.inActiveIcon}
						/>
					</InsideLink>
				</Tooltip>
			))}
			{externalLinks.map((link: ExternalLink) => (
				<Tooltip
					text={link.title ? link.title : ''}
					offset={3}
					key={link.href}
					icon={link.tooltipIcon ? link.tooltipIcon : undefined}
				>
					<OutsideLink
						href={injectPathParams(link.href, { subdomain })}
						target="_blank"
						data-testid={link.dataTestId}
					>
						<SideNavButton icon={link.inActiveIcon} />
					</OutsideLink>
				</Tooltip>
			))}
		</SideNavContainer>
	);
};

export default SideNav;
