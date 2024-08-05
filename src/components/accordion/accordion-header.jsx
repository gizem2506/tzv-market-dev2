import { styled } from "@mui/material/styles";
import ChevronRight from "@mui/icons-material/ChevronRight";
import FlexBox from "../../components/flex-box/flex-box";

const RootContainer = styled(FlexBox, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ open, theme }) => ({
  alignItems: "center",
  padding: ".5rem 1rem",
  justifyContent: "space-between",
  ".caret": {
    transition: "transform 250ms ease-in-out",
    transform: `rotate(${open ? "90deg" : "0deg"})`,
    ...(theme.direction === "rtl" && {
      transform: `rotate(${open ? "90deg" : "180deg"})`,
    }),
  },
}));
export default function AccordionHeader(props) {
  const { open, children, showIcon = true, ...others } = props;
  return (
    <RootContainer open={open ? 1 : 0} {...others}>
      {children}
      {showIcon ? <ChevronRight className="caret" fontSize="small" /> : null}
    </RootContainer>
  );
}
