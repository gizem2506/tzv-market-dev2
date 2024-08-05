"use client";

import { useState } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Scrollbar from "../../../../components/scrollbar";
import {
  TableHeader,
  TablePagination,
} from "../../../../components/data-table";
import useMuiTable from "../../../../hooks/useMuiTable";
import ProductRow from "../product-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";

// TABLE HEADING DATA LIST
const tableHeading = [
  {
    id: "name",
    label: "Ürün Adı",
    align: "left",
  },
  {
    id: "category",
    label: "Kategoriler",
    align: "left",
  },
  {
    id: "price",
    label: "Fiyat",
    align: "left",
  },
  {
    id: "stock",
    label: "Stok",
    align: "left",
  },
  {
    id: "description",
    label: "Özellikler",
    align: "left",
  },
  {
    id: "published",
    label: "Yayınlama",
    align: "left",
  },
  {
    id: "action",
    label: "Eylemler",
    align: "center",
  },
];

export default function ProductsPageView({ products }) {
  const [productList, setProductList] = useState(products || []);


  const filteredProducts = productList.map((item) => ({
    id: item.id,
    slug: item.product_slug,
    name: item.product_name,
    stock: item.product_stock,
    description: item.product_description,
    price: item.price,
    image: item.product_image?.length > 0 ? item.product_image[0].imageName : null,
    published: item.published,
    categories: item.categories.map(category => category.categoryName).join(" - ")
  }));


  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: filteredProducts,
  });
  return (
    <PageWrapper title="Ürünler">
      <SearchArea
        handleSearch={() => {}}
        buttonText="Ürün Ekle"
        url="/admin/products/create"
        searchPlaceholder="Ürün Ara..."
      />

      <Card>
        <Scrollbar autoHide={false}>
          <TableContainer
            sx={{
              minWidth: 900,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={products.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((product, index) => (
                  <ProductRow key={index} product={product} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(products.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
}
