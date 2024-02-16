import { useAccount } from '@/services/account';
import { useUnread } from '@/services/conversations';
import { env } from '@/utils/env';
import { injectPathParams } from '@/utils/paths';
import { Icon } from '@burstsms/react-components';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, type ReactNode } from 'react';
import { AccountHeader, BadgeStyled, H1, Hero, Menu, MenuItem, MenuLink } from './Header.styles';
import {
	ActivityIcon,
	ContactsIcon,
	EmailSmsIcon,
	KeywordsIcon,
	QuickSmsIcon,
	SendSmsIcon,
} from './Icons';
import { ContentWrapper } from './TransmitLayout.styles';

interface MenuItem {
	label: string;
	href: string;
	icon: ReactNode;
	suffix?: ReactNode;
	isActive?: boolean;
}

interface Props {
	title: string;
}

const externalUrlRegExp = /^https?:\/\//;

export function Header({ title }: Props) {
	const router = useRouter();
	const { account } = useAccount();
	const { unread } = useUnread();
	const transmitUrl = useMemo(
		() =>
			injectPathParams(env.TRANSMITSMS_URL, {
				subdomain: account?.parent?.subdomain ?? env.FALLBACK_SUBDOMAIN,
			}),
		[account?.parent?.subdomain]
	);
	const menuItems = useMemo(() => {
		const showInbox = router.pathname !== '/campaign/[[...paths]]';
		let menuItems: Array<MenuItem>;
		if (showInbox) {
			menuItems = [
				{ label: 'Activity', href: `${transmitUrl}/overview`, icon: <ActivityIcon /> },
				{
					label: 'Inbox',
					href: '/inbox',
					icon: <Icon icon="InboxSolidMail" width={16} />,
					suffix: <BadgeStyled>{unread ?? 0}</BadgeStyled>,
					isActive: /^\/inbox/.test(router.pathname),
				},
				{
					label: 'Send SMS',
					href: '/campaign',
					icon: <SendSmsIcon />,
					isActive: router.pathname === '/campaign/[[...paths]]',
				},
				{ label: 'Contacts', href: `${transmitUrl}/lists`, icon: <ContactsIcon /> },
				{ label: 'Keywords', href: `${transmitUrl}/response-campaigns`, icon: <KeywordsIcon /> },
				{ label: 'Email SMS', href: `${transmitUrl}/emails`, icon: <EmailSmsIcon /> },
			];
		} else {
			menuItems = [
				{ label: 'Activity', href: `${transmitUrl}/overview`, icon: <ActivityIcon /> },
				{ label: 'Contacts', href: `${transmitUrl}/lists`, icon: <ContactsIcon /> },
				{
					label: 'Send SMS',
					href: '/campaign',
					icon: <SendSmsIcon />,
					isActive: router.pathname === '/campaign/[[...paths]]',
				},
				{ label: 'Keywords', href: `${transmitUrl}/response-campaigns`, icon: <KeywordsIcon /> },
				{ label: 'Email SMS', href: `${transmitUrl}/emails`, icon: <EmailSmsIcon /> },
				{
					label: 'Quick SMS',
					href: `${transmitUrl}/overview?quick_sms=1`,
					icon: <QuickSmsIcon />,
				},
			];
		}
		return menuItems;
	}, [transmitUrl, unread, router.pathname]);

	function renderMenuItem(menuItem: MenuItem) {
		const isExternalUrl = externalUrlRegExp.test(menuItem.href);
		const label = (
			<>
				{menuItem.icon}
				{menuItem.label}
				{menuItem.suffix}
			</>
		);

		return (
			<MenuItem key={menuItem.href}>
				{isExternalUrl ? (
					<MenuLink href={menuItem.href}>{label}</MenuLink>
				) : (
					<Link href={menuItem.href} legacyBehavior passHref>
						<MenuLink className={menuItem.isActive ? 'active' : undefined}>{label}</MenuLink>
					</Link>
				)}
			</MenuItem>
		);
	}

	return (
		<ContentWrapper>
			<Hero>
				<a href={`${transmitUrl}/overview`}>
					{account?.logo_url ? (
						<Image
							src={account.logo_url}
							alt={account?.parent?.name || 'TransmitSMS'}
							width={140}
							height={57}
						/>
					) : (
						<AccountHeader>{account?.parent?.name || 'TransmitSMS'}</AccountHeader>
					)}
				</a>
				<H1>{title}</H1>
			</Hero>

			<Menu>{menuItems.map(renderMenuItem)}</Menu>
		</ContentWrapper>
	);
}
