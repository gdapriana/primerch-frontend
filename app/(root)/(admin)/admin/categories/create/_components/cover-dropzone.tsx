"use client";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { ImageIcon, Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";

const CategoryCoverDropzone = ({
  cover,
}: {
  cover: {
    value: File | null;
    setValue: Dispatch<SetStateAction<File | null>>;
  };
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile: File | undefined = acceptedFiles[0];
    if (selectedFile) {
      cover.setValue(selectedFile);
      const reader: FileReader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxFiles: 1,
  });

  const removeImage = (): void => {
    setPreview(null);
    cover.setValue(null);
  };

  return (
    <div className="flex flex-col h-full gap-2">
      {!preview ? (
        <div
          {...getRootProps()}
          className={`
                  border h-full border-primary/5 p-8 
                  flex flex-col items-center justify-center gap-3
                  cursor-pointer transition-colors
                  ${
                    isDragActive
                      ? "border-primary/10 bg-primary"
                      : "border-background hover:border-primary/10"
                  }
                `}
        >
          <input {...getInputProps()} />
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            {isDragActive ? (
              <Upload className="w-6 h-6 text-blue-500" />
            ) : (
              <ImageIcon className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">
              {isDragActive ? "Drop image here" : "Upload cover image"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Click to browse or drag and drop
            </p>
          </div>
          <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
        </div>
      ) : (
        <div className="relative overflow-hidden border border-primary/5">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-1.5 bg-background rounded-full shadow-lg hover:bg-background/80 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
          {cover.value && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <p className="text-xs truncate">{cover.value.name}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryCoverDropzone;
