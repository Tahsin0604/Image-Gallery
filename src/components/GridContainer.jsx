import uploadImage from "/images/upload-icon.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages, updatedOrder } from "../features/images/imageSlice";
import { useEffect } from "react";
import ImageCard from "./ImageCard";
import {
  DndContext,
  MouseSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

const GridContainer = () => {
  const { isLoading, isError, error, images } = useSelector(
    (state) => state.images
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const sensors = useSensors(mouseSensor);
  const onDragEnd = (e) => {
    const { active, over } = e;
    if (active.id === over.id) {
      return;
    }
    const oldIndex = images.findIndex((item) => item.id === active.id);
    const newIndex = images.findIndex((item) => item.id === over.id);
    const newImages = arrayMove(images, oldIndex, newIndex);
    dispatch(updatedOrder(newImages));
  };
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
      sensors={sensors}
    >
      <div className="py-5 px-8 md:px-16 lg:px-20">
        {isLoading && <div>Loading ...</div>}
        {!isLoading && isError && <div>{error}</div>}
        {!isLoading && !isError && (
          <SortableContext items={images}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full h-full">
              {images.map((image, index) => (
                <ImageCard key={image.id} index={index} image={image} />
              ))}
              <div className="col-span-1 border border-slate-300 rounded-md group cursor-pointer">
                <img
                  src={uploadImage}
                  alt="add-image"
                  className="w-full h-full rounded-md"
                />
              </div>
            </div>
          </SortableContext>
        )}
      </div>
    </DndContext>
  );
};

export default GridContainer;
