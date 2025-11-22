export const removeEmptyFields = (data: any) => {
	Object.keys(data).forEach((key) => {
		if (data[key] === '' || data[key] === null || data[key] === undefined) {
			delete data[key];
		}
	});
};

export const durationToString = (duration: number) => {
	const hours = Math.floor(duration / 60);
	const minutes = duration - (hours * 60);
	return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0': ''}${minutes}`
}