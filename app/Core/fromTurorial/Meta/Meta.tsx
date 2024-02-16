import Head from 'next/head';
import { useMemo } from 'react';

interface Props {
	title?: string;
	description?: string;
	favicon?: string;
}

export function Meta({
	title,
	description = 'SMS services & APIs for business',
	favicon = '/favicon.ico',
}: Props) {
	const metaTitle = useMemo(() => `${title ? `${title} | ` : ''}TransmitSMS`, [title]);

	return (
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
			<title>{metaTitle}</title>
			<meta name="description" content={description} />
			<link rel="icon" href={favicon} />
		</Head>
	);
}
