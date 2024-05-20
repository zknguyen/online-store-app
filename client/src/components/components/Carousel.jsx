import Slider from 'react-slick';

function Carousel({ content }) {
    const NextArrow = ({ onClick }) => {
        return (
            <div className="arrow next" onClick={onClick}>
                <i className="fa-solid fa-arrow-right"></i>
            </div>
        );
    };
    const PrevArrow = ({ onClick }) => {
        return (
            <div className="arrow prev" onClick={onClick}>
                <i className="fa-solid fa-arrow-left"></i>
            </div>
        );
    };

    const sliderSettings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <NextArrow/>,
      prevArrow: <PrevArrow/>,
    };

    return (
        <Slider {...sliderSettings}>
            {content}
        </Slider>
    );
}

export default Carousel;