// To test async operations
export const delay = (ms: number) =>
	new Promise(resolve => setTimeout(resolve, ms));
