import Avatar from "@mui/material/Avatar";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { FlexBox } from "../../../components/flex-box";
import { Paragraph } from "../../../components/Typography";
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";

export default function StatisticsRow({ customer }) {
  const { views, name, sales_number, stock_quantity } = customer || {};
  const STYLE = {
    fontWeight: 400,
  };
  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Paragraph fontWeight={600}>{name}</Paragraph>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left" sx={STYLE}>
        {sales_number}
      </StyledTableCell>

      <StyledTableCell align="left" sx={STYLE}>
        {views}
      </StyledTableCell>

      <StyledTableCell align="left" sx={STYLE}>
        {stock_quantity}
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton>
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
