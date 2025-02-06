// Example using Cloudinary
export const uploadImage = async (file: File) => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('upload_preset', 'YOUR_UPLOAD_PRESET');

	const response = await fetch(
		`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
		{
			method: 'POST',
			body: formData,
		},
	);

	const data = await response.json();
	return data.secure_url;
};
