import { useSession } from "next-auth/react";
import FlexBox from "../../../../components/flex-box/flex-box";
import AccountPopover from "./account-popover";
import NotificationsPopover from "./notification-popover";
import { IconButton } from "@mui/material";
import useHeader from "@/src/components/header/hooks/use-header";
import Icon from "../../../../icons"; 
import DialogDrawer from "@/src/components/header/components/dialog-drawer";

export default function RightContent() {
  const { data } = useSession();
  const {
    dialogOpen,
    sidenavOpen,
    searchBarOpen,
    toggleDialog,
    toggleSearchBar,
    toggleSidenav
  } = useHeader();  const ICON_STYLE = {
    color: "grey.600",
    fontSize: 20,
  };
  return (
    <FlexBox alignItems="center" gap={2}>
      <NotificationsPopover />
      {!data && (
        <IconButton onClick={toggleDialog}>
          <Icon.User sx={ICON_STYLE} />
        </IconButton>
      )}
      {data && <AccountPopover />}{" "}
      <DialogDrawer dialogOpen={dialogOpen} sidenavOpen={sidenavOpen} toggleDialog={toggleDialog} toggleSidenav={toggleSidenav} />

    </FlexBox>
  );
}
