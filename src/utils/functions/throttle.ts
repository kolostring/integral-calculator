export default function throttle(mainFunction: (...args: any[]) => any, delay: number) {
	let isBusy = false;
	let waitingArgs: null | any[] = null;

	const timeoutFunc = () => {
		if (waitingArgs == null) {
			isBusy = false;
		} else {
			mainFunction(...waitingArgs);
			waitingArgs = null;
			setTimeout(timeoutFunc, delay);
		}
	};

	return (...args: any[]) => {
		if (isBusy) {
			waitingArgs = args;
			return;
		}

		mainFunction(...args);
		isBusy = true;
		setTimeout(timeoutFunc, delay);
	};
}
