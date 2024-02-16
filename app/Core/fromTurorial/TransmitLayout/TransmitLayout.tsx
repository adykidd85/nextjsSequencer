import { useAuth } from '@/components/Core/Auth';
import { useAccount } from '@/services/account';
import { getShade } from '@/utils/colors';
import { isEmpty } from 'lodash-es';
import { useEffect, useMemo, type CSSProperties, type ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { Footer } from './Footer';
import { Header } from './Header';
import { TopNav } from './TopNav';
import { ContentWrapper, Main } from './TransmitLayout.styles';

interface CSSPropertiesWithTheme extends CSSProperties {
	'--theme-color-primary'?: string;
	'--theme-color-light'?: string;
}

const TransmitGlobalStyle = createGlobalStyle`
	${normalize}

	:root {
		--theme-color-primary: #00aec5;
		--theme-color-light: #e5f6f8;
	}
`;

interface Props {
	children: ReactNode;

	/**
	 * Title to be shown in the header
	 */
	title: string;

	/**
	 * Whether the user must be authenticated to view this page
	 * @default true
	 */
	needsAuth?: boolean;
}

export function TransmitLayout({ children, title, needsAuth = true }: Props) {
	const { ensureAuthenticated } = useAuth();
	const { account } = useAccount();
	const themeStyles = useMemo(() => {
		const styles: CSSPropertiesWithTheme = {};

		if (!isEmpty(account?.color_scheme)) {
			const primaryColor = `#${account!.color_scheme}`;
			styles['--theme-color-primary'] = primaryColor;
			styles['--theme-color-light'] = getShade(primaryColor, 0.1);
		}

		return styles;
	}, [account]);

	useEffect(() => {
		if (needsAuth) {
			ensureAuthenticated();
		}
	}, [ensureAuthenticated, needsAuth]);

	return (
		<div style={themeStyles}>
			<TransmitGlobalStyle />

			<TopNav />
			<Header title={title} />

			<Main>
				<ContentWrapper>{children}</ContentWrapper>
			</Main>

			<Footer />
		</div>
	);
}
