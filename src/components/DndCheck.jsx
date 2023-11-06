import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../features/selectedImages/selectedImagesSlice";
import { fetchImages } from "../features/images/imageSlice";

const DndCheck = () => {
  const {
    images: { isLoading, isError, error, images },
    selectedImages,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  let content;
  if (isLoading) content = <div>Loading ...</div>;
  if (!isLoading & isError) content = <div>{error}</div>;
  if (!isLoading & !isError)
    content = (
      <Droppable droppableId="image-list" direction="horizontal">
        {(provided) => (
          <div
            className="grid grid-cols-2 gap-4"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {images.map((image, index) => (
              <Draggable key={image.id} draggableId={image.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${
                      index === 0 ? "col-span-2 row-span-2" : "col-span-1"
                    } border border-slate-300 rounded-md group cursor-pointer`}
                  >
                    <div className="relative z-0 rounded-md">
                      <img
                        src={image.imageLink}
                        alt={`Image ${index + 1}`}
                        className="w-full h-full rounded-md"
                      />
                      <div
                        className={`absolute inset-0 px-4 py-4 rounded-md ${
                          isSelected
                            ? "bg-black bg-opacity-30"
                            : "bg-opacity-20 group-hover:bg-black group-hover:bg-opacity-30 transition ease-in-out duration-500 delay-200 "
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="selectedImage"
                          id="image"
                          checked={isSelected}
                          className={`w-4 h-4 cursor-pointer accent-blue-500 z-10 ${
                            isSelected
                              ? "block"
                              : "hidden group-hover:block group-hover:opacity-100 transition duration-300 ease-in "
                          }`}
                          onChange={() => handleSelected(image.id)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );

  if (isSelected) {
    if (selectedImages.length === 0) {
      setIsSelected(false);
    }
  }
  const handleSelected = (id) => {
    if (isSelected) {
      setIsSelected(false);
      dispatch(remove(id));
    } else {
      setIsSelected(true);
      dispatch(add(id));
    }
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    // Reorder the images based on the drag and drop result
    const updatedImages = Array.from(images);
    const [reorderedImage] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedImage);

    // setImages(updatedImages);
  };

  return <DragDropContext onDragEnd={onDragEnd}>{content}</DragDropContext>;
};

export default DndCheck;
