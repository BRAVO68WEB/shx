export default class InfoService {
	static async getSystemInfo() {
		const sys = {
			platform: process.platform,
			arch: process.arch,
			nodeVersion: process.version,
			uptime: process.uptime(),
			memoryUsage: process.memoryUsage(),
			cpuUsage: process.cpuUsage(),
			pid: process.pid,
			ppid: process.ppid,
			cwd: process.cwd(),
			execPath: process.execPath,
			execArgv: process.execArgv,
			argv: process.argv,
			env: process.env,
			config: process.config,
			title: process.title,
			version: process.version,
			versions: process.versions,
			release: process.release,
			features: process.features,
		};

		return sys;
	}
}
