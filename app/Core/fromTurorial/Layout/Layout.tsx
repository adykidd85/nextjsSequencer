import { useAuth } from '@/components/Core/Auth';
import { useEffect, type ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { Header } from './Header';

const GlobalStyle = createGlobalStyle`
	${normalize}
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

export function Layout({ children, title, needsAuth = true }: Props) {
	const { ensureAuthenticated } = useAuth();

	useEffect(() => {
		if (needsAuth) {
			ensureAuthenticated();
		}
	}, [ensureAuthenticated, needsAuth]);

	return (
		<main>
			<GlobalStyle />

			<Header title={title} />

			{children}
		</main>
	);
}
