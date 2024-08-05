import { useEffect, useState } from "react";
import api from "utils/__api__/sales";
export default function useSales(
  defaultSelectCategory = "women",
  fetchCategory = 0
) {
  const PRODUCT_PER_PAGE = 28;
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    defaultSelectCategory
  );

  const handlePageChange = (_, page) => setPage(page);
  const handleCategoryChange = (category) => () =>
    setSelectedCategory(category);

  useEffect(() => {
    if (fetchCategory === 1) {
      api.getCategoriesTwo().then((data) => setCategories(data));
    } else {
      api.getCategories().then((data) => setCategories(data));
    }
  }, [fetchCategory]);

  useEffect(() => {
    api.getProducts(page).then((data) => setProductList(data));
  }, [page]);
  return {
    page,
    categories,
    productList,
    selectedCategory,
    PRODUCT_PER_PAGE,
    handlePageChange,
    handleCategoryChange,
  };
}
