import { useState, useLayoutEffect } from "react";
import debounce from "@/utils/functions/debounce";
import throttle from "@/utils/functions/throttle";
export default function useScroll(
	throttleDelay: number,
	debounceScrollEndDelay: number,
) {
	const [scrollPosition, setScrollPosition] = useState(0);
	const [isScrolling, setIsScrolling] = useState(false);

	useLayoutEffect(() => {

		const handleScrollEnd = () => {
			setScrollPosition(window.scrollY);
			setIsScrolling(false);
		};

		const debouncedHandleScrollEnd = debounce(
			handleScrollEnd,
			debounceScrollEndDelay,
		);

		const handleScroll = () => {
			debouncedHandleScrollEnd();
			setScrollPosition(window.scrollY);
			setIsScrolling(true);
		};

		const throttledHandleScroll = throttle(
			handleScroll,
			throttleDelay
		)

		window.addEventListener("scroll", throttledHandleScroll);
		window.addEventListener("scrollend", handleScrollEnd);
		return () => {
			window.removeEventListener("scroll", throttledHandleScroll);
			window.removeEventListener("scrollend", handleScrollEnd);
		};
	}, [throttleDelay, debounceScrollEndDelay]);

	return { scrollPosition, isScrolling };
}