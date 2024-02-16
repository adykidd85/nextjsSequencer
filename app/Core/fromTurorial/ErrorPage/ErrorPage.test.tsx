import { renderWithThemeProvider } from '@burstsms/react-components';
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ErrorPage } from './ErrorPage';

vi.mock('next/router', () => require('next-router-mock'));

function renderContainer() {
	renderWithThemeProvider(<ErrorPage code={404} />);
}

describe('ErrorPage', () => {
	test('it should render the heading', () => {
		renderContainer();
		expect(screen.getByText('Page not found')).toBeInTheDocument();
	});
});
