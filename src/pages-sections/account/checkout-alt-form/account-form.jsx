"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import DeliveryAddress from "./delivery-address";
import PageWrapper from "../../vendor-dashboard/page-wrapper";
import { FlexBox } from "../../../components/flex-box";
import NewAddressForm from "./new-address-form";

const checkoutSchema = yup.object().shape({
  card: yup.string().required("required"),
  date: yup.string().required("required"),
  time: yup.string().required("required"),
  address: yup.string().required("required"),
  cardHolderName: yup.string().required("required"),
  cardNumber: yup.number().required("required"),
  cardMonth: yup.string().required("required"),
  cardYear: yup.number().required("required"),
  cardCVC: yup.number().required("required"),
  voucher: yup.string(),
});
export default function CheckoutForm() {
  const router = useRouter();

  const initialValues = {
    card: "",
    date: "",
    time: "",
    address: "",
    voucher: "",
    cardHolderName: "",
    cardNumber: "",
    cardMonth: "",
    cardYear: "",
    cardCVC: "",
  };

  const handleFormSubmit = async (values) => {
    console.log(values);
    router.push("/payment");
  };
  const [addressList, setAddressList] = useState([...DUMMY_ADDRESS_LIST]);

  const handleAddNewAddress = (address) => {
    setAddressList((state) => [...state, { ...address, id: Date.now() }]);
  };

  return (
    <>
      <PageWrapper title="Adreslerim">
        <FlexBox mb={4}>
          <NewAddressForm handleAddNewAddress={handleAddNewAddress} />
        </FlexBox>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => {
            // CHANGE FIELD VALUE DATA
            const handleFieldValueChange = (value, fieldName) => {
              setFieldValue(fieldName, value);
            };

            return (
              <form onSubmit={handleSubmit}>
                <DeliveryAddress
                  handleFieldValueChange={handleFieldValueChange}
                  values={values}
                />
              </form>
            );
          }}
        </Formik>
      </PageWrapper>
    </>
  );
}
const DUMMY_ADDRESS_LIST = [
  {
    id: 1,
    name: "Home",
    phone: "+17804084466",
    street2: "435 Bristol, MA 2351",
    street1: "375 Subidbazaar, MA 2351",
  },
  {
    id: 2,
    name: "Office",
    phone: "+18334271710",
    street2: "968 Brockton, MA 2351",
    street1: "645 Bondorbazaar, MA 2351",
  },
  {
    id: 3,
    name: "Office 2",
    phone: "+17754739407",
    street2: "777 Kazi, MA 2351",
    street1: "324 Ambarkhana, MA 2351",
  },
];
