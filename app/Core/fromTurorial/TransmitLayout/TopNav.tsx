import { useAuth } from '@/components/Core/Auth';
import { LinkButton } from '@/components/Core/TransmitLayout';
import { useAccount } from '@/services/account';
import { useBalance } from '@/services/balance';
import { env } from '@/utils/env';
import { formatCurrency } from '@/utils/format';
import { injectPathParams } from '@/utils/paths';
import { useMemo } from 'react';
import type { ExternalLink } from './ExternalLink';
import {
	AccountBalance,
	AccountBalanceContainer,
	AccountMenu,
	AccountName,
	InnerContainer,
	LogoutButton,
	Menu,
	OuterContainer,
} from './TopNav.styles';
import { ContentWrapper } from './TransmitLayout.styles';

export function TopNav() {
	const auth = useAuth();
	const { account } = useAccount();
	const { balance } = useBalance();
	const transmitUrl = useMemo(
		() =>
			injectPathParams(env.TRANSMITSMS_URL, {
				subdomain: account?.parent?.subdomain ?? env.FALLBACK_SUBDOMAIN,
			}),
		[account?.parent?.subdomain]
	);
	const links = useMemo(() => {
		let links: Array<ExternalLink> = [
			{ title: 'Messaging', href: `${transmitUrl}/overview`, isActive: true },
			{ title: 'Numbers', href: `${transmitUrl}/numbers` },
			{ title: 'Settings', href: `${transmitUrl}/profile` },
			{ title: 'Billing', href: `${transmitUrl}/billing` },
			{ title: 'API', href: 'https://developer.transmitsms.com/', target: '_blank' },
		];

		if (account?.is_parent) {
			links.unshift({ title: 'Clients', href: `${transmitUrl}/resellers` });
		}

		if (account?.feature_flags?.mms_enabled) {
			links.push({ title: 'MMS', href: `${transmitUrl}/mms` });
		}

		if (account?.feature_flags?.conversr_enabled) {
			links.push({ title: 'Conversr', href: env.CONVERSR_URL });
		}

		return links;
	}, [account, transmitUrl]);
	const addCreditLink = useMemo(() => `${transmitUrl}/billing?action=credit`, [transmitUrl]);

	return (
		<OuterContainer>
			<ContentWrapper>
				<InnerContainer>
					{account && (
						<>
							<Menu>
								{links.map((link) => (
									<li key={link.href}>
										<a
											href={link.href}
											target={link.target}
											className={link.isActive ? 'active' : ''}
										>
											{link.title}
										</a>
									</li>
								))}
							</Menu>

							<AccountMenu>
								<AccountName>{account?.company_name}</AccountName>
								<LogoutButton onClick={auth.logOut}>Logout</LogoutButton>
								{!account?.is_parent_pay && (
									<>
										<AccountBalanceContainer>
											Balance:
											<AccountBalance>{formatCurrency(balance?.balance, balance?.currency)}</AccountBalance>
										</AccountBalanceContainer>
										<LinkButton size="small" href={addCreditLink}>
											Add credit
										</LinkButton>
									</>
								)}
							</AccountMenu>
						</>
					)}
				</InnerContainer>
			</ContentWrapper>
		</OuterContainer>
	);
}
