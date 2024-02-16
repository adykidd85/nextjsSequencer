import { renderWithThemeProvider } from '@burstsms/react-components';
import { fireEvent, screen } from '@testing-library/react';
import { mockedAccount } from 'mocks/data';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { QueryClientWrapper } from 'utils/QueryClientWrapper';
import Header from './Header.component';
import HeaderContainer from './Header.container';

const routes = [
	{
		id: 'root',
		path: '/test',
		element: <HeaderContainer navInfo={{}} />,
		handle: { title: 'test' },
	},
	{
		id: 'test-page',
		path: '/test-navInfo',
		element: (
			<HeaderContainer navInfo={{ 'test-page': { title: 'test-title' } }} />
		),
		handle: { title: 'test' },
	},
	{
		id: 'test-page-no-title',
		path: '/test-no-title',
		element: (
			<HeaderContainer
				navInfo={{ 'test-page-no-title': { title: 'no-title' } }}
			/>
		),
	},
];

beforeEach(() => {
	window.ResizeObserver = jest.fn().mockImplementation(() => ({
		observe: jest.fn(),
		unobserve: jest.fn(),
		disconnect: jest.fn(),
	}));
});

describe('Header top bar', () => {
	test('email address is rendered', () => {
		renderWithThemeProvider(
			<Header title="title" email={mockedAccount.email} logout={jest.fn()} />
		);
		expect(screen.getByText(mockedAccount.email)).toBeInTheDocument();
	});
	test('header title is rendered', () => {
		renderWithThemeProvider(
			<QueryClientWrapper>
				<RouterProvider
					router={createMemoryRouter(routes, {
						initialEntries: ['/test'],
						initialIndex: 1,
					})}
				/>
			</QueryClientWrapper>
		);
		expect(screen.getByText('test')).toBeInTheDocument();
	});
	test('header title is rendered from navInfo', () => {
		renderWithThemeProvider(
			<QueryClientWrapper>
				<RouterProvider
					router={createMemoryRouter(routes, {
						initialEntries: ['/test-navInfo'],
						initialIndex: 1,
					})}
				/>
			</QueryClientWrapper>
		);
		expect(screen.getByText('test-title')).toBeInTheDocument();
	});
	test('header title is not rendered from navInfo if no title was defined in the router in the first place', () => {
		renderWithThemeProvider(
			<QueryClientWrapper>
				<RouterProvider
					router={createMemoryRouter(routes, {
						initialEntries: ['/test-no-title'],
						initialIndex: 1,
					})}
				/>
			</QueryClientWrapper>
		);
		expect(screen.queryByText('no-title')).not.toBeInTheDocument();
	});
	test('calls logout function when popover menu item is clicked', async () => {
		const mockLogout = jest.fn();
		renderWithThemeProvider(
			<Header title="" name="test-name" logout={mockLogout} />
		);
		fireEvent.click(screen.getByRole('button'));
		fireEvent.click(screen.getByText('Log out'));
		expect(mockLogout).toHaveBeenCalledTimes(1);
	});
});
