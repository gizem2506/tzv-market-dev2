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
import { deleteSliderById } from "../../../services/slider-services";

export default function SliderRow({ product }) {
  const { id,name, image,  published, slug } =
    product || {};
  const router = useRouter();
  const [productPublish, setProductPublish] = useState(published);

  
  const handleDelete = async () => {
    try {
      await deleteSliderById(id);
    } catch (error) {
      console.error("Failed to delete slider:", error.message);
    }
  };
  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
         

          <div>
            <Paragraph fontWeight={600}>{name}</Paragraph>
          </div>
        </FlexBox>
      </StyledTableCell>



      <StyledTableCell align="left">
        <div>
        <Avatar
            alt={name}
            src={`/uploads/images/${image}`}
            sx={{
              borderRadius: 2,
            }}
          />

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
     


        <StyledIconButton onClick={handleDelete}>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
