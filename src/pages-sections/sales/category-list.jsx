import { forwardRef } from "react";
import Box from "@mui/material/Box";
import appIcons from "icons";
import { H5 } from "components/Typography";
import FlexBox from "components/flex-box/flex-box";
import { CategoryBoxWrapper, StyledChip } from "./styles";

const CategoryList = forwardRef(
  ({ categories, selectedCategory, handleCategoryChange }, ref) => (
    <Box mb={4} overflow="hidden" ref={ref}>
      <FlexBox m={-1.5} flexWrap="wrap">
        {categories.map((item) => {
          const selectedItem = item.slug === selectedCategory ? 1 : 0;
          const Icon = appIcons[item.icon];
          return (
            <CategoryBoxWrapper
              key={item.slug}
              selected={selectedItem}
              onClick={() => handleCategoryChange(item.slug)}
            >
              <Icon
                fontSize="inherit"
                sx={{
                  fontSize: 44,
                }}
                color={selectedItem ? "primary" : "secondary"}
              />

              <H5 color={selectedItem ? "primary.main" : "inherit"}>
                {item.name}
              </H5>

              <StyledChip
                size="small"
                color="primary"
                label="Upto 40% off"
                selected={selectedItem}
              />
            </CategoryBoxWrapper>
          );
        })}
      </FlexBox>
    </Box>
  )
);

// Eklemeniz gereken displayName satırı
CategoryList.displayName = "CategoryList";

export default CategoryList;
