"use client"
import React, { Children, useEffect,useMemo } from "react";
import {
    Alert, FlexGrid,
    H3,
    Body1,
    Spacing,
    theme,
    ThemeProps, Caption, H1, ThemeProvider, Card,IconType, Tooltip 
} from "@burstsms/react-components";
import {
	InsideLink,
	LogoLink,
	OutsideLink,
	SideNavButton,
	SideNavContainer,
} from '../Core/SideNav/SideNav.styles';
import { useMatch } from 'react-router';
import { externalPaths, injectPathParams, paths } from '../../router/Paths';
//import env from '../../utils/env';
import { ReactComponent as Logo } from '../../public/next.svg';

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


export default function HomeLayout({ children }: { children: React.ReactNode }) {
    const isCampaignsPage = true;
	const isCampaignReportPage = false;
	const isCreateCampaignPage = false;
	const isCampaignTypesPage =false;
	const url = 'http://stage.sqn.cr';
	//const { account } = useAccount();
	const subdomain = 'stage.sqn.cr'
		//account?.parent?.subdomain ?? env.REACT_APP_FALLBACK_SUBDOMAIN;

    const internalLinks = useMemo(() => {
		const links: Array<InternalLink> = [
			{
				title: 'Campaigns',
				to: 'campaign1',
				dataTestId: 'link-campaigns',
				isActive:
					!!isCampaignsPage || !!isCreateCampaignPage || !!isCampaignReportPage,
				activeIcon: 'ShareSolidMegaphone',
				inActiveIcon: 'ShareOutlineMegaphone',
			},
			{
				title: 'Campaign Types',
				to: 'campaign',
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
				href: 'http://stage.sqn.cr/campaign2',
				dataTestId: 'link-contacts',
				activeIcon: 'UserSolidProfileUsers',
				inActiveIcon: 'UserOutlineProfileUsers',
				tooltipIcon: 'ArrowsOutlineExternalLink',
			},
			{
				title: 'Settings',
				href: 'http://stage.sqn.cr/campaign1',
				dataTestId: 'link-settings',
				tooltipIcon: 'ArrowsOutlineExternalLink',
				activeIcon: 'SettingSolidCog',
				inActiveIcon: 'SettingOutlineCog',
			},
		];
		return links;
	}, [subdomain]);
    var message = 'shhshs hdgdgdg gagsgs'
 for (const s of message) {
  const codePoint = s.codePointAt(0);
  console.log(s)
  console.log( s.codePointAt(0))
 // if (codePoint && !gsmCodePoints.has(codePoint) && !gsmExtendedCodePoints.has(codePoint)) {
  //  return false;
  //}
}
    return (
        <ThemeProvider>
            <Body1> <SideNavContainer>
		
			{internalLinks.map((link: InternalLink) => (
				<Tooltip text={link.title ? link.title : ''} offset={3} key={link.to}>
				
						<SideNavButton
							title={link.title ? link.title : ''}
							aria-label={link.title ? link.title : ''}
							$isActive={link.isActive}
							className={link.isActive ? 'active' : ''}
							icon={link.isActive ? link.activeIcon : link.inActiveIcon}
						/>
				</Tooltip>
			))}
			{externalLinks.map((link: ExternalLink) => (
				<Tooltip
					text={link.title ? link.title : ''}
					offset={3}
					key={link.href}
					icon={link.tooltipIcon ? link.tooltipIcon : undefined}
				>
					
						<SideNavButton icon={link.inActiveIcon} />
				</Tooltip>
			))}
		</SideNavContainer></Body1>
        </ThemeProvider >
        )
}