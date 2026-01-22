import { useMutation } from "@tanstack/react-query";
import { UploadedImage } from "@/helpers/type/upload.type";
import {
  uploadMultipleImages,
  uploadSingleImage,
} from "@/helpers/request/upload.request";

export const useUploadSingleImage = () => {
  return useMutation<UploadedImage, Error, File>({
    mutationFn: uploadSingleImage,
  });
};

export const useUploadMultipleImages = () => {
  return useMutation<UploadedImage[], Error, File[]>({
    mutationFn: uploadMultipleImages,
  });
};
