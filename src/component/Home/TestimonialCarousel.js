import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const TestimonialSlider = ({ testimonialsData }) => {
  // Ensure testimonialsData is defined and is an array
  const safeTestimonialsData = Array.isArray(testimonialsData) ? testimonialsData : [];

  return (
    <Carousel
      additionalTransfrom={0}
      arrows={false}  // Disable the navigation buttons
      autoPlay={true}  // Enable auto play
      autoPlaySpeed={3000}  // Set auto scroll interval to 5 seconds
      centerMode={false}
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      infinite={true}  // Infinite scrolling
      itemClass=""
      keyBoardControl={false}  // Disable keyboard control
      minimumTouchDrag={80}
      pauseOnHover={true}  // Pause when the user hovers over the carousel
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024
          },
          items: 3,
          partialVisibilityGutter: 40
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0
          },
          items: 1,
          partialVisibilityGutter: 30
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464
          },
          items: 2,
          partialVisibilityGutter: 30
        }
      }}
      slidesToSlide={1}
      swipeable
    >
      {/* Check if testimonialsData is empty */}
      {safeTestimonialsData.length === 0
        ? <div>Loading...</div>  // You can replace this with your own loader component
        : safeTestimonialsData.map((testimonial, index) => {
            return (
              <div className='w-full flex flex-col gap-[10px] items-center justify-center font-bodyFont text-[14px] text-textColour' key={index}>
                
                {/* Testimonial Title */}
                <div className="font-semibold text-xl">
                  <p>{testimonial.title}</p>
                </div>

                {/* Testimonial Text */}
                <div className="text-center text-sm px-4">
                  <p>"{testimonial.text}"</p>
                </div>

                {/* Rating */}
                <div className="flex justify-center mt-2">
                  {Array.from({ length: testimonial.rating }).map((_, idx) => (
                    <span key={idx} className="text-yellow-500">★</span>
                  ))}
                </div>
              </div>
            )
          })}
    </Carousel>
  );
};

export default TestimonialSlider;