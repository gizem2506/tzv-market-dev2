import { Fragment, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useFormik } from "formik";
import * as yup from "yup";
import { H5 } from "../../../components/Typography";
import { addUserAddress } from "../../../services/useraddress_services";
import { useSession } from "next-auth/react";

const validationSchema = yup.object({
  address_description: yup.string(),
  receiver_name: yup.string().required("Alıcı adı zorunludur."),
  address_name: yup.string().required("Adres adı zorunludur."),
  cell_phone: yup.string().required("Cep telefonu zorunludur."),
  landline_phone: yup.string().required("Sabit telefon zorunludur."),
  city: yup.string().required("Şehir zorunludur."),
  district: yup.string().required("İlçe zorunludur."),
  zipCode: yup.string().required("Posta kodu zorunludur."),
  type: yup.string().required("Adres türü zorunludur.")
});

export default function NewAddressForm({ handleAddNewAddress }) {
  const [openModal, setOpenModal] = useState(false);
  const { data } = useSession();

  useEffect(() => {}, []);
  const handleCloseModal = () => setOpenModal(false);

  const initialValues = {
    userId: data?.user?.id,
    receiver_name: "",
    address_name: "",
    address_description: "",
    cell_phone: "",
    landline_phone: "",
    city: "",
    district: "",
    zipCode: "",
    type: "SHIPPING", 
  };

  const { handleChange, handleSubmit, errors, touched, values, setFieldValue } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await addUserAddress(values);
        handleCloseModal();
        resetForm();
      } catch (error) {
        console.error("Adres eklenirken bir hata oluştu:", error.message);
      }
    },
  });

  return (
    <Fragment>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => setOpenModal(true)}
      >
        Yeni Adres Ekle
      </Button>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent>
          <H5 mb={4}>Yeni Adres Bilgileri Ekle</H5>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="receiver_name"
                  value={values.receiver_name}
                  label="Alıcı Adını Giriniz"
                  onChange={handleChange}
                  helperText={touched.receiver_name && errors.receiver_name}
                  error={touched.receiver_name && Boolean(errors.receiver_name)}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="landline_phone"
                  value={values.landline_phone}
                  onChange={handleChange}
                  label="Sabit Telefonunuzu Girin"
                  helperText={touched.landline_phone && errors.landline_phone}
                  error={touched.landline_phone && Boolean(errors.landline_phone)}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="cell_phone"
                  value={values.cell_phone}
                  onChange={handleChange}
                  label="Cep Telefonunuzu Girin"
                  helperText={touched.cell_phone && errors.cell_phone}
                  error={touched.cell_phone && Boolean(errors.cell_phone)}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="address_name"
                  label="Adres Adı"
                  value={values.address_name}
                  onChange={handleChange}
                  helperText={touched.address_name && errors.address_name}
                  error={touched.address_name && Boolean(errors.address_name)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="address_description"
                  label="Açık Adres"
                  value={values.address_description}
                  onChange={handleChange}
                  helperText={touched.address_description && errors.address_description}
                  error={touched.address_description && Boolean(errors.address_description)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="city"
                  label="Şehir"
                  value={values.city}
                  onChange={handleChange}
                  helperText={touched.city && errors.city}
                  error={touched.city && Boolean(errors.city)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="district"
                  label="İlçe"
                  value={values.district}
                  onChange={handleChange}
                  helperText={touched.district && errors.district}
                  error={touched.district && Boolean(errors.district)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="zipCode"
                  label="Posta Kodu"
                  type="text"
                  value={values.zipCode}
                  onChange={handleChange}
                  helperText={touched.zipCode && errors.zipCode}
                  error={touched.zipCode && Boolean(errors.zipCode)}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <RadioGroup
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="SHIPPING"
                    control={<Radio />}
                    label="Gönderim Adresi"
                  />
                  <FormControlLabel
                    value="BILLING"
                    control={<Radio />}
                    label="Fatura Adresi"
                  />
                </RadioGroup>
                {touched.type && errors.type && (
                  <div style={{ color: "red" }}>{errors.type}</div>
                )}
              </Grid>

              <Grid item sm={6} xs={12}>
                <Button color="primary" variant="contained" type="submit">
                  Kaydet
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
