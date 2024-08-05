import { Fragment } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import styled from "@mui/material/styles/styled";
import Done from "@mui/icons-material/Done";
import Delivery from "../../../icons/Delivery";
import PackageBox from "../../../icons/PackageBox";
import TruckFilled from "../../../icons/TruckFilled";
import { Paragraph } from "../../../components/Typography";
import { FlexBetween, FlexBox } from "../../../components/flex-box";
import { Button } from "@mui/material";
import { sendVerificationEmailToUser } from "@/src/actions/cargo";

const StyledFlexbox = styled(FlexBetween)(({ theme }) => ({
  flexWrap: "wrap",
  marginTop: "2rem",
  marginBottom: "2rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  "& .line": {
    height: 4,
    minWidth: 50,
    flex: "1 1 0",
    [theme.breakpoints.down("sm")]: {
      flex: "unset",
      height: 50,
      minWidth: 4,
    },
  },
}));
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  top: -5,
  right: -5,
  width: 22,
  height: 22,
  position: "absolute",
  bgcolor: theme.palette.grey[200],
  color: theme.palette.success.main,
}));
export default function OrderProgress() {
  const ORDER_STATUS = "Shipping";
  const STEP_ICONS = [PackageBox, TruckFilled, Delivery];
  const ORDER_STATUS_LIST = ["Packaging", "Shipping", "Delivering", "Complete"];
  const statusIndex = ORDER_STATUS_LIST.indexOf(ORDER_STATUS);

  const handleButtonClick = async () => {
    const email = "gizemaltayis@gmail.com"; // Bu değeri dinamik olarak almak isteyebilirsiniz
    const result = await sendVerificationEmailToUser(email);
    console.log(result);
  };

  return (
    <Card
      sx={{
        mt: 4,
        p: "2rem 1.5rem",
        mb: 4,
      }}
    >
      <Button
        p="0.5rem 1rem"
        textAlign="center"
        borderRadius="300px"
        sx={{
          color: "primary.main",
          bgcolor: "primary.light",
        }}
        onClick={handleButtonClick}
      >
        Kargoya Vermek için tıklayınız.
      </Button>
      <StyledFlexbox>
        {STEP_ICONS.map((Icon, ind) => (
          <Fragment key={ind}>
            <Box position="relative">
              <Avatar
                alt="shipping"
                sx={{
                  width: 64,
                  height: 64,
                  color: ind <= statusIndex ? "white" : "primary.main",
                  bgcolor: ind <= statusIndex ? "primary.main" : "grey.300",
                }}
              >
                <Icon color="inherit" fontSize="large" />
              </Avatar>

              {ind < statusIndex ? (
                <StyledAvatar alt="done">
                  <Done
                    color="inherit"
                    sx={{
                      fontSize: 16,
                    }}
                  />
                </StyledAvatar>
              ) : null}
            </Box>

            {ind < STEP_ICONS.length - 1 ? (
              <Box
                className="line"
                bgcolor={ind < statusIndex ? "primary.main" : "grey.300"}
              />
            ) : null}
          </Fragment>
        ))}
      </StyledFlexbox>

      <FlexBox
        justifyContent={{
          xs: "center",
          sm: "flex-end",
        }}
      >
        <Paragraph
          p="0.5rem 1rem"
          textAlign="center"
          borderRadius="300px"
          color="primary.main"
          bgcolor="primary.light"
        >
          Tahmini Teslim Tarihi<b>4 Ekim</b>
        </Paragraph>
      </FlexBox>
    </Card>
  );
}
