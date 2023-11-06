/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../features/selectedImages/selectedImagesSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ImageCard = ({ index, image }) => {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.id });

  const { selectedImages } = useSelector((state) => state.selectedImages);
  const [isSelected, setIsSelected] = useState(false);
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
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`${
        index === 0 ? "col-span-2 row-span-2" : "col-span-1"
      } border border-slate-300 rounded-md group cursor-pointer`}
    >
      <div className="relative rounded-md z-0">
        <img
          src={image.imageLink}
          alt={`Image ${index + 1}`}
          className="w-full h-full rounded-md"
        />
        <div
          className={`absolute inset-0 px-4 py-4 rounded-md ${
            isSelected
              ? "bg-black bg-opacity-30"
              : "bg-opacity-20 group-hover:bg-black group-hover:bg-opacity-30 transition ease-in-out duration-500 delay-200 z-10"
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
  );
};

export default ImageCard;
