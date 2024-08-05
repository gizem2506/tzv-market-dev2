"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
import { register } from "../../../actions/register";
import { RegisterSchema } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { H6 } from "../../../components/Typography";

const RegisterPageView = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = React.useTransition();

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    setSuccess("");
    setError("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <div>
          <H6>Ad Soyad</H6>
          <TextField
            {...form.register("name")}
            id="name"
            type="text"
            fullWidth
            name="name"
            size="small"
            variant="outlined"
            disabled={isPending}
            placeholder="John Doe"
          />
        </div>
        <Box sx={{ marginTop: 2 }}>
          <H6>E-Posta Adresi</H6>
          <TextField
            {...form.register("email")}
            id="email"
            fullWidth
            name="email"
            size="small"
            variant="outlined"
            type="email"
            disabled={isPending}
            placeholder="john@doe"
          />
        </Box>
        <Box sx={{ marginTop: 2, marginBottom: 2 }}>
          <H6>Şifre</H6>
          <TextField
            {...form.register("password")}
            id="password"
            type="password"
            fullWidth
            name="password"
            size="small"
            variant="outlined"
            disabled={isPending}
            placeholder="****"
          />
        </Box>
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
      </div>
      <Button
        fullWidth
        type="submit"
        color="primary"
        variant="contained"
        size="large"
        disabled={isPending}
      >
        Hesap Oluştur
      </Button>
    </form>
  );
};

export default RegisterPageView;
