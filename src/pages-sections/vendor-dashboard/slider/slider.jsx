"use client";

import { useState } from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer"; 
import Scrollbar from "../../../components/scrollbar";
import { TableHeader, TablePagination } from "../../../components/data-table"; 
import useMuiTable from "../../../hooks/useMuiTable"; 
import SliderRow from "../slider/slider-row";
import SearchArea from "../search-box";
import PageWrapper from "../page-wrapper"; 


// TABLE HEADING DATA LIST
const tableHeading = [{
  id: "name",
  label: "Slider Adı",
  align: "left"
}, {
  id: "image",
  label: "Slider Resmi",
  align: "left"
},  {
  id: "published",
  label: "Yayınlama",
  align: "left"
}, {
  id: "action",
  label: "Eylemler",
  align: "center"
}]; 

export default function SliderPageView({
  products
}) {
  const [productList, setProductList] = useState([...products]); 

  const filteredProducts = productList.map(item => ({
    id: item.id,
    name: item.slider_title,
    image: item.slider_image,
    published: item.published,
  }));
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    listData: filteredProducts
  });
  return <PageWrapper title="Slider Listesi">
      <SearchArea handleSearch={() => {}} buttonText="Slider Ekle" url="/admin/slider/create" searchPlaceholder="Slider Ara..." />

      <Card>
        <Scrollbar autoHide={false}>
          <TableContainer sx={{
          minWidth: 900
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} rowCount={products.length} numSelected={selected.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map((product, index) => <SliderRow key={index} product={product} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(products.length / rowsPerPage)} />
        </Stack>
      </Card>
    </PageWrapper>;
}