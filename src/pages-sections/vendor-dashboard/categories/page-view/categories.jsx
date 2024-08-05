"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import Scrollbar from "../../../../components/scrollbar";
import { TableHeader, TablePagination } from "../../../../components/data-table";
import useMuiTable from "../../../../hooks/useMuiTable";
import CategoryRow from "../category-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";
import { tableHeading } from "../table-heading";
import { TableCell, TableRow } from "@mui/material";

const CategoriesPageView = ({ categories }) => {
  const filteredCategories = categories.map((item) => ({
    id: item.id,
    categoryName: item.categoryName,
    featured: item.featured,
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
    listData: filteredCategories,
  });

  return (
    <PageWrapper title="Kategoriler">
      <SearchArea
        handleSearch={() => {}}
        buttonText="Kategori Ekle"
        url="/admin/categories/create"
        searchPlaceholder="Kategori arayınız..."
      />

      <Card>
        <Scrollbar>
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
                rowCount={categories.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.length > 0 ? (
                  filteredList.map((category) => (
                    <CategoryRow
                      key={category.id}
                      category={category}
                      selected={selected}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography align="center" mt={6}>
                        Listelenecek kategori bulunmamaktadır.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(categories.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
};

export default CategoriesPageView;
