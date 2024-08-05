"use client";

import useTheme from "@mui/material/styles/useTheme";
import { GridItemOne, GridItemTwo, StyledRoot, StyledGrid } from "./styles";
import { H1, H2, H5, H6 } from "../../../components/Typography";
import LazyImage from "../../../components/LazyImage";
import { Carousel } from "../../../components/carousel";
import { useEffect, useState } from "react";
import { getAllSlider } from "@/src/services/slider-services";

export default function Section1() {
  const { direction } = useTheme();
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const sliders = await getAllSlider();
      const formattedData = sliders.map((slider) => ({
        id: slider.id,
        imgUrl: slider.slider_image,
        title: slider.slider_title,
      }));
      setCarouselData(formattedData);
    }
    fetchData();
  }, []);

  return (
    <StyledRoot className="mb-3">
      <Carousel
        dots
        arrows={false}
        spaceBetween={0}
        slidesToShow={1}
        dotColor="white"
        dotStyles={{
          bottom: 25,
          position: "absolute",
          ...(direction === "rtl"
            ? {
                right: 40,
              }
            : {
                left: 40,
              }),
        }}
      >
        {carouselData.map((item) => (
          <StyledGrid container key={item.id} minHeight={400}>
            <GridItemOne item md={7} sm={7} xs={12}>
              <H2 maxWidth={400}  lineHeight="1.20">
              <span dangerouslySetInnerHTML={{ __html: item.title }} />
              </H2>
            </GridItemOne>

            <GridItemTwo item md={5} sm={5} xs={12}>
              <LazyImage
                priority
                width={570}
                height={360}
                src={`/uploads/images/${item.imgUrl}`}
                alt={item.title}
              />
            </GridItemTwo>
          </StyledGrid>
        ))}
      </Carousel>
    </StyledRoot>
  );
}
