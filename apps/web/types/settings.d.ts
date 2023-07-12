interface ISettings {
	theme: string;
	language: string;
	imageExtensions: string[];
	fileExtensions: string[];
}

interface ISysSettings {
	platform: string;
	arch: string;
	nodeVersion: string;
	uptime: string;
	kernelVersion: string;
	hostname: string;
}
