"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer"; 
import Scrollbar from "../../../../components/scrollbar";
import { TableHeader, TablePagination } from "../../../../components/data-table"; 
import ReviewRow from "../review-row";
import PageWrapper from "../../page-wrapper"; 
import useMuiTable from "../../../../hooks/useMuiTable"; 
import { useSession } from "next-auth/react";


// TABLE HEADING DATA LIST
const tableHeading = [{
  id: "product",
  label: "Ürün",
  align: "left"
}, {
  id: "customer",
  label: "Müşteri",
  align: "left"
}, {
  id: "comment",
  label: "Yorum",
  align: "left"
},  
{
  id: "published",
  label: "Yayınlama",
  align: "left",
},{
  id: "action",
  label: "Sil",
  align: "center"
}]; 

export default function ProductReviewsPageView({
  reviews
}) {
  const { data } = useSession();

// RESHAPE THE REVIEW LIST BASED TABLE HEAD CELL ID
  const filteredReviews = reviews?.map(item => ({
    id: item.id,
    published: true,
    comment: item.comment,
    product: item.productId,
    customer: data.user.name
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
    listData: filteredReviews,
    defaultSort: "product"
  });
  return <PageWrapper title="Ürün Yorumları">
      <Card>
        <Scrollbar>
          <TableContainer sx={{
          minWidth: 1000
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} numSelected={selected.length} rowCount={filteredList.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map(review => <ReviewRow review={review} key={review.id} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(filteredList.length / rowsPerPage)} />
        </Stack>
      </Card>
    </PageWrapper>;
}