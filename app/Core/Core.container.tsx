import React, { useEffect } from 'react';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import { useAccount } from 'data/account';
import useAsyncEffect from 'utils/useAsyncEffect';
import CoreComponent from './Core.component';
import AuthWrapper from './Authentication/AuthWrapper';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
	interface Window {
		heap: any;
		clarity: any;
		analytics: any;
	}
}

const Core: React.FC = () => {
	const { account } = useAccount();
	const LDClient = useLDClient();

	useEffect(() => {
		if (account?.account_id) {
			// /** Identify Heap */
			if (global.window?.heap && global.window.heap?.identify) {
				global.window.heap.identify(account?.heap_identity);
			}
			/** Identify Clarity */
			if (global.window?.clarity) {
				global.window.clarity('set', 'account_id', account?.account_id);
			}
			/** Identify Segment/Amplitude */
			if (global.window?.analytics) {
				global.window.analytics.identify(account?.account_id, {
					name: account.account_name,
					email: account.email,
					companyName: account.company_name,
					timezone: account.timezone,
					environment: process.env.NODE_ENV,
				});
			}
		}
	}, [account]);

	/** Identify Launch Darkly */
	useAsyncEffect(async () => {
		if (account && account.email && account.account_id) {
			const LDUser = LDClient?.getUser();
			if (LDUser && LDUser.key !== account.account_id) {
				await LDClient?.identify({
					email: account.email,
					key: account.account_id,
					anonymous: false,
				});
			}
		}
	}, [account]);

	// AuthWrapper is here as it needs to be a child of react-router
	return (
		<AuthWrapper>
			<CoreComponent />
		</AuthWrapper>
	);
};

export default Core;
