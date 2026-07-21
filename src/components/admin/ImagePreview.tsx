import ImageCard from "./ImageCard";

type Props = {
  images: string[];
  setImages: (images: string[]) => void;
};

const ImagePreview = ({ images, setImages }: Props) => {
  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  if (images.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-5">
      {images.map((image, index) => (
        <ImageCard
          key={index}
          image={image}
          onDelete={() => removeImage(index)}
        />
      ))}
    </div>
  );
};

export default ImagePreview;
