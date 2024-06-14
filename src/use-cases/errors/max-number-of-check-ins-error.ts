export class MaxNumberOfCheckInsError extends Error {
	constructor() {
		super('Max Check Ins Reached');
	}
}