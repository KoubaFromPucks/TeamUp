import React from 'react';

export const UserImage = ({ imageUrl }: { imageUrl?: string }) => (
	<img
		src={imageUrl}
		alt="User image"
		className="mb-4 h-80 w-80 rounded-full object-cover"
	/>
);
