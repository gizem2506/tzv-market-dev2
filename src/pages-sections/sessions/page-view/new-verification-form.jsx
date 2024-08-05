"use client";
import React, { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { newVerification } from "../../../actions/new-verification";
import { H1, Paragraph } from "../../../components/Typography";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [token, _] = useState(searchParams.get("token"));
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const onSubmit = useCallback(async () => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    try {
      const data = await newVerification(token);
      setSuccess(data?.success);
      setError(data?.error);
    } catch (error) {
      setError("Something went wrong!");
    }
  }, [token, success, error]);

  useEffect(() => {
    if (!hasSubmitted) {
      onSubmit();
      setHasSubmitted(true);
    }
  }, [onSubmit, hasSubmitted]);

  return (
    <div>
      <H1 className="text-2xl font-bold mb-2">
        Doğrulama işleminiz onaylandı.
      </H1>
      <div>
        {!success && !error && <BeatLoader />}
        {success && <Paragraph>{success}</Paragraph>}
        {error && <Paragraph>{error}</Paragraph>}
      </div>
      <div className="mt-4">
        <a href="/login">Giriş sayfasına dön</a>
      </div>
    </div>
  );
};

export default NewVerificationForm;
