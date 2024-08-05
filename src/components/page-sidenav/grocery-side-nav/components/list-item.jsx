"use client";

import Category from "@/src/icons/Category";
import { FlexBox } from "../../../flex-box";
import { Span } from "../../../Typography";
import { NavLink } from "@/src/components/nav-link";
export default function ListItem({ title, slug }) {
  return (
    <NavLink href={`/products/categories/${slug}`}>
      <FlexBox py={1} gap={1.5} alignItems="center">
        <Category fontSize="small" color="inherit" />
        <Span fontWeight={600}>{title}</Span>
      </FlexBox>{" "}
    </NavLink>
  );
}
