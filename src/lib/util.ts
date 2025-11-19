export const removeEmptyFields = (data: any) => {
	Object.keys(data).forEach((key) => {
		if (data[key] === '' || data[key] === null || data[key] === undefined) {
			delete data[key];
		}
	});
};
