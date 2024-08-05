"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import { FlexBox } from "../../../components/flex-box";
import BazaarSwitch from "../../../components/BazaarSwitch";
import { Paragraph } from "../../../components/Typography";
import { currency } from "../../../lib";
import {
  StyledTableRow,
  CategoryWrapper,
  StyledTableCell,
  StyledIconButton,
} from "../styles";
import { deleteProductsById } from "../../../services/products-services";

export default function ProductRow({ product }) {
  const { id,categories, name, price, image, description, stock, published, slug } =
    product || {};
  const router = useRouter();
  const [productPublish, setProductPublish] = useState(published);


  const handleDelete = async () => {
    try {
      await deleteProductsById(id);
      router.refresh(); 
    } catch (error) {
      console.error("Ürün silinemedi:", error.message);
    }
  };
 

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar
            alt={name}
            src={`/uploads/images/${image}`}
            sx={{
              borderRadius: 2,
            }}
          />

          <div>
            <Paragraph fontWeight={600}>{name}</Paragraph>
          </div>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{categories}</CategoryWrapper>
      </StyledTableCell>
      <StyledTableCell align="left">{currency(price)}</StyledTableCell>
      <StyledTableCell align="left">{stock}</StyledTableCell>

      <StyledTableCell align="left">
        <div>
          <Paragraph fontWeight={600}>{description}</Paragraph>
        </div>
      </StyledTableCell>

      <StyledTableCell align="left">
        <BazaarSwitch
          color="info"
          checked={productPublish}
          onChange={() => setProductPublish((state) => !state)}
        />
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton
          onClick={() => router.push(`/admin/products/${slug}`)}
        >
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton onClick={handleDelete}>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
