"use client";
import { useState, useTransition } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import BoxLink from "../components/box-link";
import { H3 } from "../../../components/Typography";
import { FlexRowCenter } from "../../../components/flex-box";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "../../../schemas";
import { reset } from "../../../actions/reset";

const ForgotPassword = () => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values) => {
    setSuccess("");
    setError("");

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <H3 mb={3} textAlign="center">
        Şifrenizi Sıfırlama Bağlantısı Gönderin
      </H3>

      <Box sx={{ marginBottom: 2 }}>
        <TextField
          {...form.register("email")}
          fullWidth
          name="email"
          type="email"
          label="E-posta"
        />
      </Box>
      <Button
        fullWidth
        type="submit"
        color="primary"
        variant="contained"
        disabled={isPending}
      >
        Sıfırlama bağlantısı gönder
      </Button>

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
      <FlexRowCenter mt={3} justifyContent="center" gap={1}>
        Hesabınız yok mu?
        <BoxLink title="Kaydolun" href="/register" />
      </FlexRowCenter>
    </form>
  );
};

export default ForgotPassword;
