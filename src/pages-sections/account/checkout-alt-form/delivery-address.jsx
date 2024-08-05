import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import ModeEditOutline from "@mui/icons-material/ModeEditOutline";
import EditAddressForm from "./edit-address-form";
import { H5, H6, Paragraph } from "../../../components/Typography";
import { FlexBox } from "../../../components/flex-box";
import { getAllUserAddresses, deleteUserAddressById } from "../../../services/useraddress_services";
import Heading from "./heading";

const DeliveryAddress = ({ values, handleFieldValueChange }) => {
  const [addressList, setAddressList] = useState([]);
  const [editAddressId, setEditAddressId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const addresses = await getAllUserAddresses();
        setAddressList(addresses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching addresses:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const changeEditAddressId = () => setEditAddressId(0);

  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteUserAddressById(addressId);
      setAddressList((state) => state.filter((item) => item.id !== addressId));
    } catch (error) {
      console.error("Error deleting address:", error.message);
    }
  };

  const handleEditAddress = async (addressId, data) => {
    try {
      // Call edit address service function
      // await editAddress(addressId, data);
      setAddressList((state) =>
        state.map((item) => {
          if (item.id === addressId) return { ...item, ...data };
          else return item;
        })
      );
      setEditAddressId(0);
    } catch (error) {
      console.error("Error editing address:", error.message);
    }
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Error: {error}</p>;

  const shippingAddresses = addressList.filter((address) => address.type === "SHIPPING");
  const billingAddresses = addressList.filter((address) => address.type === "BILLING");

  return (
    <Card
      sx={{
        p: 3,
        mb: 3,
      }}
    >
      <Heading number={1} title="Teslimat Adresleri" mb={2} />
      <Grid container spacing={3}>
        {shippingAddresses.map((item) => (
          <Grid item md={4} sm={6} xs={12} key={item.id}>
            <Card
              onClick={() => handleFieldValueChange(item.address_name, "address")}
              sx={{
                padding: 2,
                boxShadow: "none",
                cursor: "pointer",
                border: "1px solid",
                position: "relative",
                backgroundColor: "grey.100",
                borderColor: item.address_name === values.address ? "primary.main" : "transparent",
              }}
            >
              <FlexBox position="absolute" top={5} right={5}>
                <IconButton size="small" onClick={() => setEditAddressId(item.id)}>
                  <ModeEditOutline fontSize="inherit" />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => handleDeleteAddress(item.id)}>
                  <DeleteOutline fontSize="inherit" />
                </IconButton>
              </FlexBox>

              <H6 mb={0.5}>{item.name}</H6>
              <H5 color="grey.700">{item.address_name}</H5>
              {item.receiver_name && (
                <Paragraph color="grey.700">{item.receiver_name}</Paragraph>
              )}
              <Paragraph color="grey.700">{item.landline_phone}</Paragraph>
              <Paragraph color="grey.700">{item.cell_phone}</Paragraph>
              <Paragraph color="grey.700">{item.address_description}</Paragraph>
              <Paragraph color="grey.700">{item.city}</Paragraph>
              <Paragraph color="grey.700">{item.district}</Paragraph>
              <Paragraph color="grey.700">{item.zipCode}</Paragraph>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Heading number={2} title="Fatura Adresleri" mb={2} mt={2} />
      <Grid container spacing={3}>
        {billingAddresses.map((item) => (
          <Grid item md={4} sm={6} xs={12} key={item.id}>
            <Card
              onClick={() => handleFieldValueChange(item.address_name, "address")}
              sx={{
                padding: 2,
                boxShadow: "none",
                cursor: "pointer",
                border: "1px solid",
                position: "relative",
                backgroundColor: "grey.100",
                borderColor: item.address_name === values.address ? "primary.main" : "transparent",
              }}
            >
              <FlexBox position="absolute" top={5} right={5}>
                <IconButton size="small" onClick={() => setEditAddressId(item.id)}>
                  <ModeEditOutline fontSize="inherit" />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => handleDeleteAddress(item.id)}>
                  <DeleteOutline fontSize="inherit" />
                </IconButton>
              </FlexBox>

              <H6 mb={0.5}>{item.name}</H6>
              <H5 color="grey.700">{item.address_name}</H5>
              {item.receiver_name && (
                <Paragraph color="grey.700">{item.receiver_name}</Paragraph>
              )}
              <Paragraph color="grey.700">{item.landline_phone}</Paragraph>
              <Paragraph color="grey.700">{item.cell_phone}</Paragraph>
              <Paragraph color="grey.700">{item.address_description}</Paragraph>
              <Paragraph color="grey.700">{item.city}</Paragraph>
              <Paragraph color="grey.700">{item.district}</Paragraph>
              <Paragraph color="grey.700">{item.zipCode}</Paragraph>
            </Card>
          </Grid>
        ))}
      </Grid>

      {editAddressId && (
        <EditAddressForm
          handleEditAddress={handleEditAddress}
          active={Boolean(editAddressId)}
          changeEditAddressId={changeEditAddressId}
          address={addressList.find((item) => item.id === editAddressId)}
        />
      )}
    </Card>
  );
};

export default DeliveryAddress;
