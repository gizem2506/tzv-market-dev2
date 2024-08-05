import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { useFormik } from "formik";
import ProductComment from "./product-comment";
import { FlexBox } from "../../components/flex-box";
import { H2, H5 } from "../../components/Typography";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; 
import { addComment } from "../../services/comment-services";

export default function ProductReview({ comments, productId }) {
  const { data: session } = useSession();
  const [isMounted, setMounted] = useState(false);
  const initialValues = {
    rating: 0,
    comment: "",
    date: new Date().toISOString(),
  };

  const validationSchema = yup.object().shape({
    rating: yup.number().required("required"),
    comment: yup.string().required("required"),
  });

  const {
    dirty,
    values,
    errors,
    touched,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (session) {
        const commentData = {
          ...values,
          userId: session.user.id,
          productId: productId,
          rating: values.rating.toString(),
          verify: false,
        };
        try {
          const addedComment = await addComment(commentData);
        } catch (error) {
          console.error('Failed to add comment:', error);
        }
        resetForm();
      } else {
        console.error("User is not authenticated");
      }
    },
  });

  useEffect(() => {
    setMounted(true);
  }, [comments]);

  if (!isMounted) return null;

  return (
    <div>
      <ProductComment comments={comments} />

      {session ? (
        <>
          <H2 fontWeight="600" mt={7} mb={2.5}>
            Bu ürün için bir yorum yazın
          </H2>

          <form onSubmit={handleSubmit}>
            <Box mb={2.5}>
              <FlexBox mb={1.5} gap={0.5}>
                <H5 color="grey.700">Sizin Değerlendirmeniz</H5>
                <H5 color="error.main">*</H5>
              </FlexBox>

              <Rating
                color="warn"
                size="medium"
                value={values.rating}
                onChange={(_, value) => setFieldValue("rating", value)}
              />
            </Box>

            <Box mb={3}>
              <FlexBox mb={1.5} gap={0.5}>
                <H5 color="grey.700">Sizin Yorumunuz</H5>
                <H5 color="error.main">*</H5>
              </FlexBox>

              <TextField
                rows={8}
                multiline
                fullWidth
                name="comment"
                variant="outlined"
                onBlur={handleBlur}
                value={values.comment}
                onChange={handleChange}
                placeholder="Buraya bir yorum yazın..."
                error={!!touched.comment && !!errors.comment}
                helperText={touched.comment && errors.comment}
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!(dirty && isValid)}
            >
              Gönder
            </Button>
          </form>
        </>
      ) : (
        <H5 color="error.main">Yorum yapabilmek için lütfen giriş yapın.</H5>
      )}
    </div>
  );
}
