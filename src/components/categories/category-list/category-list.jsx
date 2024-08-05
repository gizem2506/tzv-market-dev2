
import MegaMenu1 from "../mega-menu/mega-menu-1";
import MegaMenu2 from "../mega-menu/mega-menu-2";
import CategoryListItem from "../category-list-item"; 
import { StyledRoot } from "./styles"; 
import { getAllCategories } from "@/src/services/categories-services";
import { useEffect, useState } from "react";

export default function CategoryList({
  open,
  position = "absolute"
}) {
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

  return <StyledRoot open={open} position={position}>
      {categories.map(item => {
      const {
        href,
        title,
        children,
        component,
        icon,
        offer
      } = item;
      const MegaMenu = component === MegaMenu1.name ? MegaMenu1 : MegaMenu2;
      return <CategoryListItem key={title} slug={item.slug}  title={title} caret={!!children} render={component ? <MegaMenu data={children} banner={offer} /> : null} />;
    })}
    </StyledRoot>;
}