import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

type Props = {
  image: string;
  onDelete: () => void;
};

const SortableImage = ({ image, onDelete }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: image,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative cursor-grab active:cursor-grabbing"
    >
      <img
        src={image}
        alt=""
        className="w-28 h-28 rounded-xl object-cover border border-[#42362F]"
      />

      <button
        type="button"
        onClick={onDelete}
        className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-600 text-white"
      >
        ×
      </button>
    </div>
  );
};

export default SortableImage;
