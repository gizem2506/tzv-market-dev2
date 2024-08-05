"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { FlexBox } from "../../components/flex-box";
import { H5, H6, Paragraph, Span } from "../../components/Typography";
import { getDateDifference } from "../../lib";
import { SentimentSatisfiedOutlined } from "@mui/icons-material";

export default function ProductComment({ comments }) {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [comments]);

  if (!comments) return <>Bu ürüne yorum yapılmamıştır.</>;

  return (
    <Box mb={4} maxWidth={600}>
      {comments.map((comment) => (
        <Box key={comment.id} mb={4}>
          <FlexBox alignItems="center" mb={2} gap={2}>
          <SentimentSatisfiedOutlined  sx={{
                width: 35,
                height: 35,
              }} fontSize="small" color="inherit" />
           
            <div>
              <H5 mb={1}>{comment.comment}</H5>
              <FlexBox alignItems="center" gap={1.25}>
                <Rating
                  size="small"
                  value={parseFloat(comment.rating)}
                  color="warn"
                  readOnly
                />
                <H6>{comment.rating}</H6>
                <Span>{getDateDifference(comment.date)}</Span>
              </FlexBox>
            </div>
          </FlexBox>

          <Paragraph color="grey.700">{comment.comment}</Paragraph>
        </Box>
      ))}
    </Box>
  );
}
