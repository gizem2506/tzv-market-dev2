import { useState } from "react";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import { useFormik } from "formik";
import * as yup from "yup";
import { H5 } from "../../../components/Typography";
import { updateUserAddressById } from "../../../services/useraddress_services";

const validationSchema = yup.object({
  address_name: yup.string().required("Adres adı zorunludur."),
  receiver_name: yup.string().required("Alıcı adı zorunludur."),
  landline_phone: yup.string().required("Sabit telefon zorunludur."),
  cell_phone: yup.string().required("Cep telefon zorunludur."),
  city: yup.string().required("Şehir zorunludur."),
  district: yup.string().required("İlçe zorunludur."),
  zipCode: yup.string().required("Posta kodu zorunludur."),
});

export default function EditAddressForm(props) {
  const { active, address, changeEditAddressId, handleEditAddress } = props;
  const [openModal, setOpenModal] = useState(active);

  const handleCloseModal = () => {
    setOpenModal(false);
    changeEditAddressId();
  };

  const initialValues = {
    address_name: address.address_name,
    landline_phone: address.landline_phone,
    cell_phone: address.cell_phone,
    receiver_name: address.receiver_name,
    address_description: address.address_description,
    city: address.city,
    district: address.district,
    zipCode: address.zipCode,
  };

  const { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await updateUserAddressById(address.id, values);
        handleEditAddress(address.id, { ...values, id: address.id });
        handleCloseModal();
      } catch (error) {
        console.error("Adres güncellenirken bir hata oluştu:", error.message);
      }
    },
  });

  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogContent>
        <H5 mb={4}>Adres Bilgilerini Düzenle</H5>

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
                helperText={
                  touched.address_description && errors.address_description
                }
                error={
                  touched.address_description &&
                  Boolean(errors.address_description)
                }
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
          </Grid>

          <Grid item sm={6} xs={12} mt={2}>
            <Button color="primary" variant="contained" type="submit">
              Kaydet
            </Button>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
