"use client";

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
import PayoutRow from "../payout-row";
import PageWrapper from "../../page-wrapper";
import { tableHeading } from "../table-heading";

export default function PayoutsPageView({ payouts }) {
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: payouts,
    defaultSort: "no",
  });
  return (
    <PageWrapper title="Ödemeler">
      <Card>
        <Scrollbar>
          <TableContainer
            sx={{
              minWidth: 800,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={payouts.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((payout, index) => (
                  <PayoutRow payout={payout} key={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(payouts.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
}
