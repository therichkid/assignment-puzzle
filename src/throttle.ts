type CallbackSignature = (...args: any[]) => void;

export const throttle = (callback: CallbackSignature, delay: number): CallbackSignature => {
	let lastCall = 0;

	return (...args: any[]): void => {
		const now = new Date().getTime();

		if (now - lastCall < delay) {
			return;
		}

		lastCall = now;
		return callback(...args);
	};
};
