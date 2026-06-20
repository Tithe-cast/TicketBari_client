import axios from "axios";

/**
 * Uploads a single image File to imgbb and returns the hosted URL.
 * Requires NEXT_PUBLIC_IMGBB_API_KEY in the client .env.local file.
 */
export const uploadImageToImgbb = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    formData
  );

  return data.data.display_url;
};
