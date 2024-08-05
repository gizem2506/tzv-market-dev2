"use client";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { LoginSchema } from "../../../schemas";
import { login } from "../../../actions/login";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { H6 } from "../../../components/Typography";

const LoginPageView = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    setSuccess("");
    setError("");

    startTransition(() => {
      login(values, callbackUrl)
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
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <H6>E-posta</H6>
      <TextField
        mb={1.5}
        fullWidth
        name="email"
        size="small"
        type="email"
        variant="outlined"
        placeholder="örnek@mail.com"
        {...form.register("email")}
      />
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <H6>Şifre</H6>
        <TextField
          mb={2}
          fullWidth
          size="small"
          name="password"
          autoComplete="on"
          variant="outlined"
          placeholder="*********"
          type="password"
          {...form.register("password")}
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
      <Button
        fullWidth
        color="primary"
        variant="contained"
        size="large"
        disabled={isPending}
        type="submit"
        className="w-full"
      >
        Giriş Yap
      </Button>
    </form>
  );
};

export default LoginPageView;
