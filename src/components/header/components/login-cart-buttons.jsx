import { useSession } from "next-auth/react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
// MUI ICON COMPONENT
import { logout } from "../../../actions/logout";

import PersonOutline from "@mui/icons-material/PersonOutline";
// CUSTOM ICON COMPONENT

import ShoppingBagOutlined from "../../../icons/ShoppingBagOutlined";
// GLOBAL CUSTOM HOOK

import useCart from "../../../hooks/useCart";
import { LogoutSharp } from "@mui/icons-material";
import { useEffect } from "react";
import AccountPopoverHeader from "../../layouts/vendor-dashboard/dashboard-navbar/account-popover-header";
// ==============================================================

// ==============================================================
export default function LoginCartButtons({ toggleDialog, toggleSidenav }) {
  const { data } = useSession();
  const { state } = useCart();

  useEffect(() => {}, []);

  const ICON_COLOR = {
    color: "grey.600",
  };

  const Logout = () => {
    logout();
  };

  return (
    <div>
      <Badge color="primary">{data && <AccountPopoverHeader />}</Badge>

      {!data && (
        <IconButton onClick={toggleDialog}>
          <PersonOutline sx={ICON_COLOR} />
        </IconButton>
      )}

      <Badge badgeContent={state.cart.length ?? 0} color="primary">
        <IconButton onClick={toggleSidenav}>
          <ShoppingBagOutlined sx={ICON_COLOR} />
        </IconButton>
      </Badge>
    </div>
  );
}
