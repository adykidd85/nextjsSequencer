import { fireEvent, render, screen } from '@testing-library/react';
import axios, { type AxiosInstance } from 'axios';
import { vi } from 'vitest';
import { ApiProvider, useApi } from './ApiProvider';

vi.mock('axios', () => ({
	default: {
		create: vi.fn().mockReturnValue({
			get: vi.fn().mockResolvedValue({}),
			post: vi.fn().mockResolvedValue({}),
			put: vi.fn().mockResolvedValue({}),
			patch: vi.fn().mockResolvedValue({}),
			delete: vi.fn().mockResolvedValue({}),
			// axios internals, not tested
			interceptors: {
				request: {
					use: vi.fn(),
					eject: vi.fn(),
				},
			},
		}),
	},
}));

function TestConsumer() {
	const api = useApi();

	return (
		<div>
			<button onClick={() => api.get('/v2/test/get')}>Test get</button>
			<button onClick={() => api.post('/v2/test/post', { id: '1', name: 'Test post' })}>
				Test post
			</button>
			<button onClick={() => api.put('/v2/test/put/1', { id: '1', name: 'Test put' })}>
				Test put
			</button>
			<button onClick={() => api.patch('/v2/test/patch/1', { name: 'Test patch' })}>
				Test patch
			</button>
			<button onClick={() => api.delete('/v2/test/delete/1')}>Test delete</button>
		</div>
	);
}

function renderContainer() {
	render(
		<ApiProvider>
			<TestConsumer />
		</ApiProvider>
	);
}

describe('ApiProvider', () => {
	let axiosInstance: AxiosInstance;

	beforeEach(() => {
		axiosInstance = axios.create();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	test('get handler', () => {
		renderContainer();
		fireEvent.click(screen.getByText('Test get'));
		expect(axiosInstance.get).toHaveBeenCalledWith('/v2/test/get');
	});

	test('post handler', () => {
		renderContainer();
		fireEvent.click(screen.getByText('Test post'));
		expect(axiosInstance.post).toHaveBeenCalledWith('/v2/test/post', {
			id: '1',
			name: 'Test post',
		});
	});

	test('put handler', () => {
		renderContainer();
		fireEvent.click(screen.getByText('Test put'));
		expect(axiosInstance.put).toHaveBeenCalledWith('/v2/test/put/1', {
			id: '1',
			name: 'Test put',
		});
	});

	test('patch handler', () => {
		renderContainer();
		fireEvent.click(screen.getByText('Test patch'));
		expect(axiosInstance.patch).toHaveBeenCalledWith('/v2/test/patch/1', {
			name: 'Test patch',
		});
	});

	test('delete handler', () => {
		renderContainer();
		fireEvent.click(screen.getByText('Test delete'));
		expect(axiosInstance.delete).toHaveBeenCalledWith('/v2/test/delete/1');
	});
});
