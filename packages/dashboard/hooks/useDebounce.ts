export const useDebounce = (
	callback: (param: any) => void | Promise<void>,
	gap: number
) => {
	let timeout: NodeJS.Timeout | null = null;

	return (param: any) => {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			callback(param);
		}, gap);
	};
};
