"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer"; 
import Scrollbar from "../../../../components/scrollbar";
import { TableHeader, TablePagination } from "../../../../components/data-table"; 
import useMuiTable from "../../../../hooks/useMuiTable"; 
import SearchArea from "../../search-box";
import StatisticsRow from "../statistics-row";
import PageWrapper from "../../page-wrapper"; 
import { tableHeading } from "../table-heading"; 

export default function ProductStatisticsPageView({
  statistics
}) {
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    listData: statistics
  });
  return <PageWrapper title="İstatistikler">
      {/* <SearchArea handleSearch={() => {}} buttonText="Add Customer" url="/admin/customers" searchPlaceholder="Search Customer..." /> */}

      <Card>
        <Scrollbar>
          <TableContainer sx={{
          minWidth: 900
        }}>
            <Table>
              <TableHeader order={order} hideSelectBtn orderBy={orderBy} heading={tableHeading} numSelected={selected.length} rowCount={filteredList.length} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map(customer => <StatisticsRow customer={customer} key={customer.id} />)}
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