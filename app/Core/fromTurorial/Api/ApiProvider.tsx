import { BACKEND_URL } from '../utils/constants';
import { useAuth0 } from '@auth0/auth0-react';
import axios, { type AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';
import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';

const axiosInstance = axios.create({
	headers: {
		'content-type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
	},
	baseURL: BACKEND_URL,
});

let apiKey: string;
export function setApiKey(newApiKey: string) {
	apiKey = newApiKey;
}

interface ContextType {
	get<T>(url: string): Promise<T>;
	post<T>(url: string, data?: unknown): Promise<T>;
	put<T>(url: string, data?: unknown): Promise<T>;
	patch<T>(url: string, data?: unknown): Promise<T>;
	delete<T>(url: string): Promise<T>;
}

const ApiContext = createContext<ContextType | null>(null);

export function useApi(): ContextType {
	const apiContext = useContext(ApiContext) as ContextType;
	if (apiContext === undefined) {
		throw new Error('useApi must be used within ApiContext.Provider');
	}
	return apiContext;
}

interface Props {
	children: ReactNode;
}

export function ApiProvider({ children }: Props) {
	const { getAccessTokenSilently } = useAuth0();

	useEffect(() => {
		const axiosInterceptor = async (
			config: InternalAxiosRequestConfig
		): Promise<InternalAxiosRequestConfig> => {
			if (!config.headers) {
				config.headers = {} as AxiosHeaders;
			}

			// TODO: Currently use API Key to allow parent account to access child accounts.
			// This can be done through RBAC in Auth0 going forwards.
			if (apiKey) {
				config.headers['x-api-key'] = apiKey;
			} else {
				const token = await getAccessTokenSilently();
				config.headers.Authorization = `Bearer ${token}`;
			}

			return config;
		};

		const interceptorId = axiosInstance.interceptors.request.use(axiosInterceptor);

		return () => {
			axiosInstance.interceptors.request.eject(interceptorId);
		};
	}, [getAccessTokenSilently]);

	async function get<T>(url: string): Promise<T> {
		const response = await axiosInstance.get(url);
		return response.data;
	}

	async function post<T>(url: string, data?: unknown): Promise<T> {
		console.log(url);
		console.log(data);
		const response = await axiosInstance.post(url, data);
		return response.data;
	}

	async function put<T>(url: string, data?: unknown): Promise<T> {
		const response = await axiosInstance.put(url, data);
		return response.data;
	}

	async function patch<T>(url: string, data?: unknown): Promise<T> {
		const response = await axiosInstance.patch(url, data);
		return response.data;
	}

	// delete is a reserved word in JS
	async function deleteFn<T>(url: string): Promise<T> {
		const response = await axiosInstance.delete(url);
		return response.data;
	}

	const value = useMemo(
		() => ({
			get,
			post,
			put,
			patch,
			delete: deleteFn,
		}),
		[]
	);

	return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}
