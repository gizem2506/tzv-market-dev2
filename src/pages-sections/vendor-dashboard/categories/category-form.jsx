"use client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { addCategory } from "../../../services/categories-services";
import { CategoryAddSchema } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid } from "@mui/material";

export default function CategoryForm() {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(CategoryAddSchema),
    defaultValues: {
      categoryName: "",
    },
  });

  const onSubmit = (values) => {
    setSuccess("");
    setError("");
    let category = {
      categoryName: values.categoryName,
      verify:false,
    };
    startTransition(() => {
      addCategory(category)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Hata Oluştu."));
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <TextField
            mb={1.5}
            name="categoryName"
            size="small"
            type="text"
            variant="outlined"
            placeholder="Kategori Adı"
            {...form.register("categoryName")}
          />
        </Grid>
       
        <Grid item xs={12} mt={2}>
          <Button
            variant="contained"
            color="info"
            type="submit"
            disabled={isPending}
          >
            Kaydet
          </Button>
        </Grid>
      </Grid>
      {error && (
        <Box
          sx={{
            color: "red",
            marginTop: 1,
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          {error}
        </Box>
      )}
      {success && (
        <Box
          sx={{
            color: "green",
            marginTop: 1,
            textAlign: "center",
            marginBottom: 2,
          }}
        >
          {success}
        </Box>
      )}
    </form>
  );
}
