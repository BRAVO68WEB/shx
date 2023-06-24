import os from 'node:os';

export default class InfoService {
	static async getSystemInfo() {
		const sys = {
			platform: process.platform,
			arch: process.arch,
			nodeVersion: process.version,
			uptime: process.uptime(),
			memoryUsage: process.memoryUsage(),
			cpuUsage: process.cpuUsage(),
			kernelVersion: os.release(),
			hostname: os.hostname(),
		};

		return sys;
	}
}
