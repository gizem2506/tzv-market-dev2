import Avatar from "@mui/material/Avatar";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { FlexBox } from "../../../components/flex-box";
import { Paragraph } from "../../../components/Typography";
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import { deleteUserById } from "@/src/services/user-services";

export default function CustomerRow({ customer }) {
  const { email, name, id, avatar, created_date } = customer || {};
  const STYLE = {
    fontWeight: 400,
  };
  const handleDelete = async () => {
    try {
      await deleteUserById(id);
      router.refresh(); 
    } catch (error) {
      console.error("Kullanıcı silinemedi:", error.message);
    }
  };
 
  const formattedDate = created_date instanceof Date ? created_date.toLocaleDateString() : created_date;

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
         <StyledTableCell align="left" sx={STYLE}>
        {id}
      </StyledTableCell>
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
     
          <Avatar alt={name} src={avatar} />
          <Paragraph fontWeight={600}>{name}</Paragraph>
        </FlexBox>
      </StyledTableCell>

    

      <StyledTableCell align="left" sx={STYLE}>
        {email}
      </StyledTableCell>

      <StyledTableCell align="left" sx={STYLE}>
        {formattedDate}
      </StyledTableCell>

      <StyledTableCell align="center">
        {/* <StyledIconButton>
          <Edit />
        </StyledIconButton> */}

        <StyledIconButton onClick={handleDelete}>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
