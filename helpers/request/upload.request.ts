import { UploadedImage } from "@/helpers/type/upload.type";
import api from "@/helpers/api/api";

export const uploadSingleImage = async (file: File): Promise<UploadedImage> => {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await api.post("/media/single", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.result.item;
};

export const uploadMultipleImages = async (
  files: File[],
): Promise<UploadedImage[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  const { data } = await api.post("/media/multiple", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.result.items;
};
