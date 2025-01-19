import "./hotel_img.css";

export const HotelImages = ({ singleHotel }) => {
  const { image, imageArr, name } = singleHotel;
  return (
    <>
      <div className="main-container">

        <div className="header">
          <h2>{name}</h2>
        </div>

        <div className="img-container">
          <div className="main-img">
            <img src={image} alt="Primary-Image" />
          </div>
          <div className="secondary-img">
            {imageArr &&
              imageArr.map((imgUrl, idx) => (
                <img key={idx} src={imgUrl} alt="Seconday-Image" />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
