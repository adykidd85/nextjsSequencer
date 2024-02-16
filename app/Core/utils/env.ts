import { bool, cleanEnv, host, str, url } from 'envalid';
import { merge } from 'lodash-es';

function getGlobalEnv() {
	if (typeof window !== 'undefined') {
		return window.ENV ?? {};
	}
	if (typeof global !== 'undefined') {
		return global.ENV ?? {};
	}
	return {};
}

function getProcessEnv() {
	// process.env variables are replaced with static values by the Next.js compiler
	// need to explicitly list them out in full here
	return {
		AUTH0_DOMAIN: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
		AUTH0_CLIENTID: process.env.NEXT_PUBLIC_AUTH0_CLIENTID,
		AUTH0_AUDIENCE: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
		BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
		TRANSMITSMS_URL: process.env.NEXT_PUBLIC_TRANSMITSMS_URL,
		CONVERSR_URL: process.env.NEXT_PUBLIC_CONVERSR_URL,
		TRACK_LINK_DOMAIN: process.env.NEXT_PUBLIC_TRACK_LINK_DOMAIN,
		OPT_OUT_LINK_DOMAIN: process.env.NEXT_PUBLIC_OPT_OUT_LINK_DOMAIN,
		USE_MOCKS: process.env.NEXT_PUBLIC_USE_MOCKS,
		CAMPAIGN_TEMPLATES_ENABLED: process.env.NEXT_PUBLIC_CAMPAIGN_TEMPLATES_ENABLED,
		NEW_SENDERS_ENABLED: process.env.NEXT_PUBLIC_NEW_SENDERS_ENABLED,
		FALLBACK_SUBDOMAIN: process.env.NEXT_PUBLIC_FALLBACK_SUBDOMAIN,
	};
}

export const env = cleanEnv(
	process.env.NODE_ENV === 'development'
		? // Allow overriding config with local .env files in development
		  merge(getGlobalEnv(), getProcessEnv())
		: // Global env (config.js) needs to take precedence in production
		  merge(getProcessEnv(), getGlobalEnv()),
	{
		// Only these keys will be passed through to the env object
		AUTH0_DOMAIN: host(),
		AUTH0_CLIENTID: str(),
		AUTH0_AUDIENCE: url(),

		BACKEND_URL: url(),
		// This needs to be str() (not url()) because it won't be a valid URL with the :subdomain dynamic param
		TRANSMITSMS_URL: str(),
		CONVERSR_URL: url(),
		FALLBACK_SUBDOMAIN: str(),

		TRACK_LINK_DOMAIN: str(),
		OPT_OUT_LINK_DOMAIN: str(),

		USE_MOCKS: bool({ default: false }),

		// Feature flags
		CAMPAIGN_TEMPLATES_ENABLED: bool({ default: false }),
		NEW_SENDERS_ENABLED: bool({ default: false }),
	},
	{
		// Always called
		reporter: ({ env: _, errors }) => {
			if (Object.keys(errors).length > 0) {
				console.error('MISCONFIGURED ENVIRONMENT:', Object.keys(errors).length, errors);
				throw Error(`MISCONFIGURED ENVIRONMENT: ${Object.keys(errors)}`);
			}
		},
	}
);
