import { renderWithThemeProvider } from '@burstsms/react-components';
import { fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import { paths } from 'router/Paths';
import { QueryClientWrapper } from 'utils/QueryClientWrapper';
import SideNav from './SideNav';

describe('SideNav', () => {
	test('redirect to campaigns page on click', () => {
		const SuccessRender: React.FC = () => {
			const location = useLocation();
			return <div>{location.pathname}</div>;
		};
		renderWithThemeProvider(
			<QueryClientWrapper>
				<MemoryRouter initialEntries={['/']}>
					<SideNav />
					<SuccessRender />
				</MemoryRouter>
			</QueryClientWrapper>
		);
		fireEvent.click(screen.getByTestId('link-campaigns'));
		expect(screen.getByText(paths.campaigns.path)).toBeInTheDocument();
	});
	test('Outside link to transmitsms contacts pages', () => {
		renderWithThemeProvider(
			<QueryClientWrapper>
				<MemoryRouter>
					<SideNav />
				</MemoryRouter>
			</QueryClientWrapper>
		);
		const linkElement = screen.getByTestId('link-contacts');
		expect(linkElement).toHaveAttribute(
			'href',
			'https://staging.burstage.com/lists'
		);
	});
	test('Outside link to transmitsms account settings page', () => {
		renderWithThemeProvider(
			<QueryClientWrapper>
				<MemoryRouter>
					<SideNav />
				</MemoryRouter>
			</QueryClientWrapper>
		);
		const linkElement = screen.getByTestId('link-settings');
		expect(linkElement).toHaveAttribute(
			'href',
			'https://staging.burstage.com/profile'
		);
	});
});
