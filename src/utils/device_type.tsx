import { useEffect, useState } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export function useDeviceType(): DeviceType {
	const [deviceType, setDeviceType] = useState<DeviceType>(() =>
		getDeviceType(window.innerWidth)
	);

	function getDeviceType(width: number): DeviceType {
		if (width < 768) return 'mobile';
		if (width < 1024) return 'tablet';
		return 'desktop';
	}

	useEffect(() => {
		const handleResize = () => {
			setDeviceType(getDeviceType(window.innerWidth));
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return deviceType;
}
