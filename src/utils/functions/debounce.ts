export default function debounce(
	mainFunction: (...args: any[]) => any,
	delay: number,
) {
	let timer: number;

	return (...args: any[]) => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			mainFunction(...args);
		}, delay);
	};
}
