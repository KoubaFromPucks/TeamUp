// To test async operations
export const delay = (ms: number) =>
	new Promise(resolve => setTimeout(resolve, ms));

export const defaultImageUrl =
	'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';

export const getImageUrlOrDefault = (imageUrl: string | undefined | null) => {
	if (imageUrl?.trim().length === 0) {
		return defaultImageUrl;
	}

	return imageUrl && imageUrl.length > 0 ? imageUrl : defaultImageUrl;
};

export const emptyToUndefined = (val: unknown) => {
	if (typeof val === 'string' && val.trim() === '') {
		return undefined;
	}

	return val;
};
