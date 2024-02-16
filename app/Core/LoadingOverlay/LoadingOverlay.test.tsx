import { screen } from '@testing-library/react';
import { renderWithThemeProvider } from '@burstsms/react-components';
import LoadingOverlay from './LoadingOverlay.component';

describe('LoadingOverlay', () => {
	test('should render loading overlay', () => {
		renderWithThemeProvider(
			<LoadingOverlay>
				<div>loading</div>
			</LoadingOverlay>
		);
		expect(screen.getByTestId('loading-page')).toBeInTheDocument();
	});

	test('should show loading spinner', () => {
		renderWithThemeProvider(
			<LoadingOverlay>
				<div>loading</div>
			</LoadingOverlay>
		);
		expect(screen.getByTestId('testid-loadingspinner')).toBeInTheDocument();
	});
});
