import { useDispatch, useSelector } from "react-redux";
import { deleteImages } from "../features/images/imageSlice";
import { clear } from "../features/selectedImages/selectedImagesSlice";

const OptionContainer = () => {
  const { selectedImages } = useSelector((state) => state.selectedImages);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteImages(selectedImages));
    dispatch(clear());
  };
  return (
    <div className="h-16 px-20 flex items-center">
      {selectedImages.length > 0 && (
        <div className="flex justify-between w-full px-1">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="imagesChecked"
              id="imagesChecked"
              className="w-4 h-4 cursor-pointer accent-blue-500"
              defaultChecked={true}
              disabled
            />
            <label htmlFor="imagesChecked" className="font-semibold text-lg">
              {selectedImages.length}{" "}
              {selectedImages.length === 1 ? "File Selected" : "Files Selected"}
            </label>
          </div>
          <div>
            <button
              className=" text-normal text-red-500"
              onClick={handleDelete}
            >
              Delete {selectedImages.length === 1 ? "File" : "Files"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionContainer;
