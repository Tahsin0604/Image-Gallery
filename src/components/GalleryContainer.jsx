import OptionContainer from "./OptionContainer";
import GridContainer from "./GridContainer";

const GalleryContainer = () => {
  return (
    <div className="bg-white rounded-md divide-y-2 divide-slate-100 w-full">
      <OptionContainer></OptionContainer>
      <GridContainer />
    </div>
  );
};

export default GalleryContainer;
