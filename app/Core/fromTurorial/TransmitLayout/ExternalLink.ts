import type { HTMLAttributeAnchorTarget } from 'react';

export interface ExternalLink {
	title: string;
	href: string;
	target?: HTMLAttributeAnchorTarget;
	isActive?: boolean;
}
