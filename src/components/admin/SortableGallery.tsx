import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import SortableImage from "./SortableImage";

type Props = {
  images: string[];
  setImages: (images: string[]) => void;
};

const SortableGallery = ({ images, setImages }: Props) => {
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={(event) => {
        const { active, over } = event;

        if (!over) return;

        if (active.id !== over.id) {
          const oldIndex = images.indexOf(active.id as string);

          const newIndex = images.indexOf(over.id as string);

          setImages(arrayMove(images, oldIndex, newIndex));
        }
      }}
    >
      <SortableContext items={images} strategy={rectSortingStrategy}>
        <div className="flex flex-wrap gap-5">
          {images.map((image, index) => (
            <SortableImage
              key={image}
              image={image}
              onDelete={() => setImages(images.filter((_, i) => i !== index))}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SortableGallery;
