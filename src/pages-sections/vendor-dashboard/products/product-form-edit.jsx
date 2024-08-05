"use client";

import { useState, useTransition } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as yup from "yup";
import DropZoneMulti from "../../../components/DropZoneMulti";
import { FlexBox } from "../../../components/flex-box";
import { UploadImageBox, StyledClear } from "../styles";
import { addProduct } from "../../../services/products-services";
import { addProductImage } from "../../../services/image-service";

const VALIDATION_SCHEMA = yup.object().shape({
  product_name: yup.string().required("İsim gereklidir!"),
  categories: yup
    .array(yup.number())
    .min(1, "Kategori en az 1 öğe içermelidir")
    .required("Kategori gereklidir!"),
  product_description: yup.string().required("Açıklama gereklidir!"),
  product_stock: yup.number().required("Stok gereklidir!"),
  price: yup.number().required("Fiyat gereklidir!"),
  product_kdv: yup.string().required("KDV gereklidir!"),
});

export default function ProductForm({ categories }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState();
  const [productSlug, setProductSlug] = useState("");

  const INITIAL_VALUES = {
    product_name: "",
    product_kdv: "",
    product_stock: "",
    price: "",
    categories: [],
    product_description: "",
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    setSuccess("");
    setError("");
    startTransition(() => {
      addProduct(values).then((data) => {
        if (data?.error) {
          resetForm();
          setError(data.error);
        }
        if (data.success && data.product) {
          resetForm();
          const formData = new FormData();
          Array.from(files).forEach((file) => {
            formData.append("files", file);
          });
  
          addProductImage(data.product.id, formData)
            .then((result) => {
              if (result) {
                alert(result.message);
              } else {
                alert("Resim yükleme başarısız oldu");
              }
            })
            .catch(() => setError("Hata Oluştu."));
          setSuccess(data.success);
          setProductSlug(data.product.product_slug);  
          setFiles([]);
        }
      });
    });
  };

  const handleChangeDropZone = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleFileDelete = (fileToDelete) => () => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
  };

  return (
    <Card className="p-3">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="product_name"
                  label="Ürün Adı"
                  color="info"
                  size="medium"
                  placeholder="Ürün adını giriniz..."
                  value={values.product_name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={touched.product_name && errors.product_name}
                  error={Boolean(touched.product_name && errors.product_name)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  color="info"
                  size="medium"
                  name="categories"
                  onBlur={handleBlur}
                  placeholder="Kategori"
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    setFieldValue(
                      "categories",
                      typeof value === "string" ? value.split(",") : value
                    );
                  }}
                  value={values.categories}
                  label="Kategori Seçiniz"
                  SelectProps={{
                    multiple: true,
                  }}
                  error={Boolean(touched.categories && errors.categories)}
                  helperText={touched.categories && errors.categories}
                >
                  {categories?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.categoryName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <DropZoneMulti onChange={handleChangeDropZone} />
                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {files.map((file, index) => (
                    <UploadImageBox key={index}>
                      <Box
                        component="img"
                        src={URL.createObjectURL(file)}
                        width="100%"
                        height="100%"
                      />
                      <StyledClear onClick={handleFileDelete(file)}>
                        X
                      </StyledClear>
                    </UploadImageBox>
                  ))}
                </FlexBox>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  rows={6}
                  multiline
                  fullWidth
                  color="info"
                  size="medium"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="product_description"
                  label="Özellikler"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Ürün özelliklerini giriniz..."
                  value={values.product_description}
                  error={
                    !!touched.product_description &&
                    !!errors.product_description
                  }
                  helperText={
                    touched.product_description && errors.product_description
                  }
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="product_stock"
                  color="info"
                  type="number"
                  size="medium"
                  label="Stok Sayısı"
                  placeholder="Stok sayısını giriniz..."
                  onBlur={handleBlur}
                  value={values.product_stock}
                  onChange={handleChange}
                  helperText={touched.product_stock && errors.product_stock}
                  error={Boolean(touched.product_stock && errors.product_stock)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="product_kdv"
                  label="KDV Oranı"
                  color="info"
                  type="number"
                  size="medium"
                  placeholder="KDV Oranı"
                  onBlur={handleBlur}
                  value={values.product_kdv}
                  onChange={handleChange}
                  helperText={touched.product_kdv && errors.product_kdv}
                  error={Boolean(touched.product_kdv && errors.product_kdv)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="price"
                  color="info"
                  size="medium"
                  type="number"
                  onBlur={handleBlur}
                  value={values.price}
                  label="Fiyat "
                  onChange={handleChange}
                  placeholder="Fiyat"
                  helperText={touched.price && errors.price}
                  error={Boolean(touched.price && errors.price)}
                />
              </Grid>

           

              <Grid item sm={6} xs={12}>
                <Button variant="contained" color="info" type="submit">
                  Ürünü Kaydet
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
}
