import Delete from "@mui/icons-material/Delete";
import { FlexBox } from "../../../components/flex-box";
import { Paragraph, Small } from "../../../components/Typography";
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import BazaarSwitch from "@/src/components/BazaarSwitch";
import { useState } from "react";
import {
  deleteCommentById,
  verifyCommentById,
} from "@/src/services/comment-services";
import { useRouter } from "next/navigation";

const handleError = (error) => {
  console.error(error.message);
  if (
    error.message.includes(
      "Bu işlem sadece admin kullanıcılar tarafından yapılabilir"
    )
  ) {
    alert("Bu işlem sadece admin kullanıcılar tarafından yapılabilir.");
  } else {
    alert("Bir hata oluştu: " + error.message);
  }
};

export default function ReviewRow({ review }) {
  const { id, customer, product, comment, verify } = review || {};
  const [isVerified, setIsVerified] = useState(verify);
  const { router } = useRouter();
  const toggleVerification = async () => {
    try {
      await verifyCommentById(id);
      setIsVerified((prev) => !prev);
    } catch (error) {
      handleError(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCommentById(id);
      alert("Yorum başarıyla silindi.");
      router.refresh();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Paragraph fontWeight={600}>{product}</Paragraph>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">{customer}</StyledTableCell>

      <StyledTableCell align="left">
        <Small>{comment}</Small>
      </StyledTableCell>

      <StyledTableCell align="left">
        <BazaarSwitch
          color="info"
          checked={isVerified}
          onChange={toggleVerification}
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
