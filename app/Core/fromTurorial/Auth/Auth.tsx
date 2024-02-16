import { LoadingOverlay } from '@/components/Core/LoadingOverlay';
import { env } from '@/utils/env';
import { useAuth0, type OAuthError } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { useAsyncEffect } from 'rooks';
import { setApiKey } from '../Api/ApiProvider';

interface ContextType {
	isAuthenticated: boolean;

	ensureAuthenticated(): Promise<void>;
	logOut(): Promise<void>;
}

const AuthContext = createContext<ContextType | null>(null);

export function useAuth(): ContextType {
	const authContext = useContext(AuthContext) as ContextType;
	if (authContext === undefined) {
		throw new Error('useAuth must be used within AuthContext.Provider');
	}
	return authContext;
}

interface Props {
	children: ReactNode;
}

export function Auth({ children }: Props) {
	const { isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect, logout } =
		useAuth0();
	const router = useRouter();
	const [shouldBeAuthenticated, setShouldBeAuthenticated] = useState(false);

	useAsyncEffect(async () => {
		// Parse API Key
		// TODO: Currently use API Key to allow parent account to access child accounts.
		// This can be done through RBAC in Auth0 going forwards.
		// Remove this once https://burstsms.atlassian.net/browse/KJU-18 is implemented.
		const parsedQuery = queryString.parse(window.location.search);
		const parsedApiKey: string = (parsedQuery.apikey as string) || '';

		if (parsedApiKey && parsedApiKey.length > 0) {
			setShouldBeAuthenticated(false);
			setApiKey(parsedApiKey);
			return;
		}

		if (isAuthenticated || isLoading || !shouldBeAuthenticated) return;

		try {
			// This refreshes the token if it is expired
			// but Auth0 still has a valid user session
			await getAccessTokenSilently({
				authorizationParams: {
					audience: env.AUTH0_AUDIENCE,
				},
			});
		} catch (e) {
			// If these errors are thrown then the user needs to login again
			const { error } = e as OAuthError;
			if (error === 'login_required' || error === 'consent_required') {
				await loginWithRedirect({
					appState: {
						returnTo: router.pathname,
					},
				});
			} else {
				// TODO: This should render an error page
				console.error(e);
			}
		}
	}, [
		isAuthenticated,
		isLoading,
		shouldBeAuthenticated,
		router.pathname,
		loginWithRedirect,
		getAccessTokenSilently,
	]);

	async function ensureAuthenticated() {
		setShouldBeAuthenticated(true);
	}

	async function logOut() {
		// The returnTo URL needs to be added to the Auth0 client config, "Allowed Logout URLs"
		await logout({ logoutParams: { returnTo: `${window.location.origin}${router.pathname}` } });
	}

	const value = useMemo(
		() => ({
			isAuthenticated,

			ensureAuthenticated,
			logOut,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isAuthenticated]
	);

	const renderedChildren = useMemo(() => {
		if (shouldBeAuthenticated && (!isAuthenticated || isLoading)) {
			return <LoadingOverlay>{children}</LoadingOverlay>;
		}

		return <>{children}</>;
	}, [children, shouldBeAuthenticated, isAuthenticated, isLoading]);

	return <AuthContext.Provider value={value}>{renderedChildren}</AuthContext.Provider>;
}
