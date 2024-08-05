import Delete from "@mui/icons-material/Delete";
import BazaarSwitch from "../../../components/BazaarSwitch";
import {
  StyledTableRow,
  CategoryWrapper,
  StyledTableCell,
  StyledIconButton,
} from "../styles";
import {
  deleteCategoryById,
  verifyCategoriesById,
} from "../../../services/categories-services";
import { useState, useEffect } from "react";

export default function CategoryRow({ category }) {
  const { categoryName, id, verify } = category || {};
  const [reviewPublish, setReviewPublish] = useState(verify);

  useEffect(() => {
    setReviewPublish(verify);
  }, [verify]);

  const handleVerifyChange = async () => {
    try {
      const updatedCategory = await verifyCategoriesById(id);
      if (updatedCategory) {
        setReviewPublish((prev) => !prev);
      }
    } catch (error) {
      console.error("Yorum onaylanırken bir hata oluştu:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Kategori silmek istediğinize emin misiniz "${categoryName}"?`
    );
    if (confirmDelete) {
      try {
        await deleteCategoryById(id);
        alert("Kategori silindi");
      } catch (error) {
        alert(`Kategori silinemedi: ${error.message}`);
      }
    }
  };

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">{id}</StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{categoryName}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">
        <BazaarSwitch
          color="info"
          checked={reviewPublish}
          onChange={handleVerifyChange}
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
