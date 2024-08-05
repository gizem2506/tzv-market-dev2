"use client";
import Scrollbar from "../../../components/scrollbar";
import ListItem from "./components/list-item";
import NavAccordion from "./components/nav-accordion";
import { StyledCard } from "./styles";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/src/services/categories-services";

export default function GrocerySideNav({ navigation }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const categories = await getAllCategories();
      const formattedData = categories.map((category) => ({
        id: category.id,
        title: category.categoryName,
        slug: category.categorySlug,
      }));
      setCategories(formattedData);
    }
    fetchData();
  }, []);

  return (
    <Scrollbar>
      <StyledCard elevation={3}>
        {categories.map((item, ind) => {
          if (item.child) return <NavAccordion item={item} key={ind} />;
          return <ListItem title={item.title} slug={item.slug} key={ind} />;
        })}
      </StyledCard>
    </Scrollbar>
  );
}
