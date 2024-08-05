"use client";
import { useState, useTransition } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { H3, H6 } from "../../../components/Typography";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { newPassword } from "../../../actions/new-password";
import { NewPasswordSchema } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values) => {
    setSuccess("");
    setError("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <H3 mb={3} textAlign="center">
        Şifrenizi Sıfırlayın
      </H3>

      <Box sx={{ marginBottom: 2 }}>
        <H6>Şifre</H6>
        <TextField
          fullWidth
          {...form.register("password")}
          name="password"
          type="password"
          size="small"
          variant="outlined"
          disabled={isPending}
        />
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
      </Box>
      <Button
        fullWidth
        type="submit"
        color="primary"
        variant="contained"
        size="large"
        disabled={isPending}
      >
        Sıfırla
      </Button>
    </form>
  );
};

export default ResetPassword;
