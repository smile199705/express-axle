const container = {
	services: {},
	register (name, serviceConstructor, dependencies = []) {
		const resolvedDependencies = dependencies.map(dep => container.resolve(dep))
		// eslint-disable-next-line new-cap
		this.services[name] = new serviceConstructor(...resolvedDependencies)
	},
	resolve (name) {
		return this.services[name]
	}
}

export default container
