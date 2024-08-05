import Box from "@mui/material/Box";
import Button from "@mui/material/Button"; 
// ==============================================================


// ==============================================================
export default function BottomActions({
  total,
  handleNavigate
}) {
  return <Box p={2.5}>
      <Button fullWidth color="primary" variant="contained" sx={{
      mb: "0.75rem",
      height: "40px"
    }} onClick={handleNavigate("/checkout-alternative")}>
       Şimdi Ödeme Yap ({total})
      </Button>

    </Box>;
}