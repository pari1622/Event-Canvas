type Props = {
  image: string;
  onDelete: () => void;
};

const ImageCard = ({ image, onDelete }: Props) => {
  return (
    <div className="relative">
      <img
        src={image}
        alt="Product"
        className="w-28 h-28 rounded-xl object-cover border border-[#42362F]"
      />

      <button
        type="button"
        onClick={onDelete}
        className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-600 text-white hover:bg-red-700"
      >
        ×
      </button>
    </div>
  );
};

export default ImageCard;
