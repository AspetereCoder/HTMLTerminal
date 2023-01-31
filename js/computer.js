export const computer = {
    directories: [{name: '~', directories: []}],

    getDir(name) {
	const rootDir = this.directories[0];

	if (name === '~') return rootDir;

	for (let dir of rootDir.directories) {
	    if (dir.name === name) {
		return dir;
	    }
	}
    }
}
