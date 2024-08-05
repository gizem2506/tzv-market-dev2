import { Fragment } from "react";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { FlexBetween } from "../../components/flex-box";
import ProductCard16 from "../../components/product-cards/product-card-16";

export default function ProductsGridView({ products }) {
  return (
    <Fragment>
      <Grid container spacing={3} px={5}>
        {products.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <ProductCard16 product={item} />
          </Grid>
        ))}
      </Grid>

      <Grid container justifyContent="center" mt={10}>
        <Pagination count={Math.ceil(products.length / 10)} variant="outlined" color="primary" />
      </Grid>
    </Fragment>
  );
}
