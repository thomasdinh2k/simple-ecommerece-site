// A lot of stuff in Next.js 13 is server side rendering, on the server, the "WINDOW" object is not exist! Only available in a browser

import { useState, useEffect } from "react";

export const useOrigin = () => {
	const [mounted, setMounted] = useState(false);

	// Checking if "WINDOW" is available, if it is, then check if we know the location, if it's there then use it
	const origin =
		typeof window !== "undefined" && window.location.origin
			? window.location.origin
			: "";

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return "";
	}

    return origin;
};
