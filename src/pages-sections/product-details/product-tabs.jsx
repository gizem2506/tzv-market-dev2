"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import styled from "@mui/material/styles/styled";
import ProductReview from "./product-review";
import ProductDescription from "./product-description";

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 10,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize",
  },
}));
export default function ProductTabs({ product }) {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionClick = (_, value) => setSelectedOption(value);

  return (
    <>
      <StyledTabs
        textColor="primary"
        value={selectedOption}
        indicatorColor="primary"
        onChange={handleOptionClick}
      >
        <Tab className="inner-tab" label="Açıklama" />
        <Tab className="inner-tab" label={`Yorumlar ${product.comments.length}`} />
      </StyledTabs>

      <Box mb={6}>
        {selectedOption === 0 && <ProductDescription product={product}  />}
        {selectedOption === 1 && <ProductReview comments={product.comments} productId={product.id} />}
      </Box>
    </>
  );
}
