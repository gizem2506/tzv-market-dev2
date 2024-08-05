"use client";

import { forwardRef } from "react";
import { useTheme } from "@mui/material/styles";
import SlickCarousel from "react-slick";

import CarouselDots from "./components/carousel-dots";
import CarouselArrows from "./components/carousel-arrows";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { RootStyle } from "./styles";

const Carousel = forwardRef((props, ref) => {
  const {
    dotColor,
    children,
    arrowStyles,
    dots = false,
    arrows = true,
    slidesToShow = 4,
    spaceBetween = 10,
    dotStyles = {
      mt: 4,
    },
    ...others
  } = props;
  const theme = useTheme();
  const settings = {
    dots,
    arrows,
    slidesToShow,
    rtl: theme.direction === "rtl",
    ...CarouselArrows(arrowStyles),
    ...CarouselDots({
      dotColor,
      sx: dotStyles,
    }),
    ...others,
  };
  return (
    <RootStyle space={spaceBetween}>
      <SlickCarousel ref={ref} {...settings}>
        {children}
      </SlickCarousel>
    </RootStyle>
  );
});

Carousel.displayName = "Carousel";

export default Carousel;
