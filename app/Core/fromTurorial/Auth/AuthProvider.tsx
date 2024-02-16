import { env } from '@/utils/env';
import { Auth0Provider, type AppState, type AuthorizationParams } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { useMemo, type ReactNode } from 'react';
import { Auth } from './Auth';

interface Props {
	children: ReactNode;
}

export function AuthProvider({ children }: Props) {
	const router = useRouter();

	const authorizationParams = useMemo<AuthorizationParams>(() => {
		let origin = '';
		// window is undefined when Next.js is running on the server
		if (typeof window !== 'undefined') {
			origin = window.location.origin;
		}
		return {
			audience: env.AUTH0_AUDIENCE,
			redirect_uri: `${origin}/auth/callback`,
		};
	}, []);

	function handleRedirectCallback(appState: AppState | undefined) {
		// What should the default/fallback route be?
		router.push(appState?.returnTo ?? '/');
	}

	return (
		<Auth0Provider
			domain={env.AUTH0_DOMAIN}
			clientId={env.AUTH0_CLIENTID}
			authorizationParams={authorizationParams}
			onRedirectCallback={handleRedirectCallback}
			useRefreshTokensFallback
		>
			<Auth>{children}</Auth>
		</Auth0Provider>
	);
}
