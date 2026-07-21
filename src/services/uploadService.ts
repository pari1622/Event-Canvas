import axios from "axios";
import API from "./api";

export const uploadImage = async (
  file: File,
  onProgress?: (progress: number) => void,
) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("image", file);

  const { data } = await axios.post(`${API}/products/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },

    onUploadProgress: (event) => {
      if (!event.total) return;

      const progress = Math.round((event.loaded * 100) / event.total);

      onProgress?.(progress);
    },
  });

  return data.image;
};
