import { useEffect } from 'react';

export default function useEvent(event, handler, passive = false) {
	useEffect(() => {
		// initiate the event handler
		window.addEventListener(event, handler, passive);

		//cleanup
		return function cleanup() {
			window.removeEventListener(event, handler);
		};
	});
}
