export default async function UploadCloudinary({
  thumbnail,
}: {
  thumbnail: File | null;
}) {
  if (!thumbnail) return;
  const formData = new FormData();
  formData.append('file', thumbnail);
  formData.append('upload_preset', 'my_protfolio');
  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await res.json();
    if (data?.secure_url) {
      return data.secure_url;
    }
  } catch (error) {
    console.log(error);
  }
}
