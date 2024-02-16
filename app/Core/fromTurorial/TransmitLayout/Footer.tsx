import { useAccount } from '@/services/account';
import { env } from '@/utils/env';
import { injectPathParams } from '@/utils/paths';
import { useMemo } from 'react';
import type { ExternalLink } from './ExternalLink';
import { Container, Menu } from './Footer.styles';
import { ContentWrapper } from './TransmitLayout.styles';

export function Footer() {
	const { account } = useAccount();
	const transmitUrl = useMemo(
		() =>
			injectPathParams(env.TRANSMITSMS_URL, {
				subdomain: account?.parent?.subdomain ?? env.FALLBACK_SUBDOMAIN,
			}),
		[account?.parent?.subdomain]
	);
	const links = useMemo<Array<ExternalLink>>(
		() => [
			{ title: 'Terms of Service', href: `${transmitUrl}/legals-terms` },
			{ title: 'Compliance Policy', href: `${transmitUrl}/legals-spam` },
			{ title: 'Privacy Policy', href: `${transmitUrl}/legals-privacy` },
			{ title: 'DPA', href: `${transmitUrl}/data-process-agreement` },
			{ title: 'Contact Us', href: `${transmitUrl}/contact` },
			{ title: 'Help', href: 'https://support.transmitsms.com/' },
		],
		[transmitUrl]
	);

	return (
		<Container>
			<ContentWrapper>
				<Menu>
					{links.map((link) => (
						<li key={link.href}>
							<a href={link.href} target="_blank">
								{link.title}
							</a>
						</li>
					))}
				</Menu>
			</ContentWrapper>
		</Container>
	);
}
