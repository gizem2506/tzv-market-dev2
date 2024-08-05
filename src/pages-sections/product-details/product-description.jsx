"use client";

import { H3 } from "../../components/Typography";

export default function ProductDescription({ product }) {
  const { product_description } = product || {};
  return (
    <div>
      <H3 mb={2}>Özellikler:</H3>
      <div>
        {product_description ? (
          <div dangerouslySetInnerHTML={{ __html: product_description }} />
        ) : (
          <div>No description available.</div>
        )}
      </div>
    </div>
  );
}
