/**
 * Takes a path and a params object and returns the path with the params interpolated
 */
export const injectPathParams = (path: string, params: Record<string, any>) =>
	Object.entries(params).reduce(
		(path, [key, value]) => path.replace(`:${key}`, String(value)),
		path
	);
