export default function debounce(
	mainFunction: (...args: any[]) => any,
	delay: number,
) {
	let timer: NodeJS.Timeout;

	return (...args: any[]) => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			mainFunction(...args);
		}, delay);
	};
}
