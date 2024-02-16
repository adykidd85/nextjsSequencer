import { LoadingSpinner } from '@burstsms/react-components';
import type { ReactNode } from 'react';
import { Container } from './LoadingOverlay.styles';

interface LoadingOverlay {
	children?: ReactNode;
}

export const LoadingOverlay: React.FC<LoadingOverlay> = ({ children }: LoadingOverlay) => {
	return (
		<>
			{children}
			<Container data-testid="loading-page">
				<LoadingSpinner />
			</Container>
		</>
	);
};
