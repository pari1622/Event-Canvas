import { useState } from "react";
import type { ChangeEvent } from "react";
import { uploadImage } from "../../services/uploadService";
import UploadProgress from "./UploadProgress";
import { validateImage } from "./ImageValidator";

type Props = {
  images: string[];
  setImages: (images: string[]) => void;
};

const ImageUploader = ({ images, setImages }: Props) => {
  const [progress, setProgress] = useState(0);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    try {
      const uploadedImages = [...images];

      for (const file of Array.from(e.target.files)) {
        const error = validateImage(file);

        if (error) {
          alert(error);
          continue;
        }

        const url = await uploadImage(file, setProgress);

        uploadedImages.push(url);
      }

      setImages(uploadedImages);

      setProgress(0);

      alert("Image Uploaded");
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    }
  };

  return (
    <div className="space-y-4">
      <UploadProgress progress={progress} />

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        className="block w-full rounded-xl border border-[#42362F] bg-[#181412] p-3"
      />
    </div>
  );
};

export default ImageUploader;
