import { renderWithThemeProvider } from '@burstsms/react-components';
import { screen } from '@testing-library/react';
import { LoadingOverlay } from './LoadingOverlay';

function renderContainer() {
	renderWithThemeProvider(
		<LoadingOverlay>
			<div>children</div>
		</LoadingOverlay>
	);
}

describe('LoadingOverlay', () => {
	test('it should render the loading overlay', () => {
		renderContainer();
		expect(screen.getByTestId('loading-page')).toBeInTheDocument();
	});

	test('it should render the loading spinner', () => {
		renderContainer();
		expect(screen.getByTestId('testid-loadingspinner')).toBeInTheDocument();
	});
});
