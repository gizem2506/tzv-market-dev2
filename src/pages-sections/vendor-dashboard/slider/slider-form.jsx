"use client";
import { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import * as yup from "yup";
import DropZone from "../../../components/DropZone";
import { FlexBox } from "../../../components/flex-box";
import { UploadImageBox, StyledClear } from "../styles";
import { uploadFile } from "@/src/lib/file";
import { addSlider } from "../../../services/slider-services";
import CKEditors from "../../../components/CKEditors";
import { H6 } from "../../../components/Typography";

const VALIDATION_SCHEMA = yup.object().shape({
  slider_title: yup.string().required("Slider adı gereklidir."),
});

export default function SliderForm() {
  const [file, setFile] = useState(null);

  const INITIAL_VALUES = {
    slider_title: "",
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { success, fileName } = await uploadFile(formData);
      if (!success) {
        alert("Dosya yükleme başarısız oldu.");
        return;
      }
      const newSlider = {
        slider_title: values.slider_title,
        slider_image: fileName,
      };
      try {
        await addSlider(newSlider);
        alert("Slider başarıyla eklendi.");
      } catch (error) {
        if (error.message.includes("Bu işlem sadece admin kullanıcılar tarafından yapılabilir")) {
          alert("Bu işlem sadece admin kullanıcılar tarafından yapılabilir.");
        } else {
          alert("Slider ekleme başarısız oldu.");
        }
      }
    } catch (error) {
      console.error("Slider ekleme hatası: ", error);
      alert("Slider ekleme başarısız oldu.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangeDropZone = useCallback((newFiles) => {
    if (newFiles.length > 0) {
      const file = newFiles[0];
      setFile(file);
    } else {
      setFile(null);
    }
  }, []);

  const handleFileDelete = () => {
    setFile(null);
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
          handleSubmit,
          setFieldValue,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <H6 mb={2}>Slider Adı</H6>
                <CKEditors
                  value={values.slider_title}
                  onChange={(data) => setFieldValue("slider_title", data)}
                />
                {touched.slider_title && errors.slider_title && (
                  <div style={{ color: "red" }}>{errors.slider_title}</div>
                )}
              </Grid>

              <Grid item xs={12}>
                <DropZone onChange={handleChangeDropZone} />

                {file && (
                  <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                    <UploadImageBox>
                      <Box
                        component="img"
                        src={URL.createObjectURL(file)}
                        width="100%"
                      />
                      <StyledClear onClick={handleFileDelete} />
                    </UploadImageBox>
                  </FlexBox>
                )}
              </Grid>

              <Grid item sm={6} xs={12}>
                <Button
                  variant="contained"
                  color="info"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Slideri Kaydet
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
}
