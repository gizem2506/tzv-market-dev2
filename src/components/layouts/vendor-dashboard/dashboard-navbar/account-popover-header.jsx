import { useEffect, useState } from "react"; 
// MUI

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import styled from "@mui/material/styles/styled";
import IconButton from "@mui/material/IconButton"; 
// GLOBAL CUSTOM COMPONENTS

import { H6, Small } from "../../../Typography"; 
import { useSession } from "next-auth/react";
import { logout } from "../../../../actions/logout";
import Link from "next/link";
import { NavLink } from "../../../nav-link";
import { AccountCircle, PersonOutline } from "@mui/icons-material";
// STYLED COMPONENT

const Divider = styled("div")(({
  theme
}) => ({
  margin: "0.2rem 0",
  border: `1px dashed ${theme.palette.grey[200]}`
}));
export default function AccountPopoverHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);
  const { data } = useSession();

  const Logout = () => {
    logout();
  };
  const ICON_COLOR = {
    color: "grey.600",
  };
  return <div>
      <IconButton sx={{
      padding: 2
    }} aria-haspopup="true" onClick={e => setAnchorEl(e.currentTarget)} aria-expanded={open ? "true" : undefined} aria-controls={open ? "account-menu" : undefined}>
        <AccountCircle fontSize="large"  sx={ICON_COLOR} />
      </IconButton>

      <Menu open={open} id="account-menu" anchorEl={anchorEl} onClose={handleClose} onClick={handleClose} transformOrigin={{
      horizontal: "right",
      vertical: "top"
    }} anchorOrigin={{
      horizontal: "right",
      vertical: "bottom"
    }}>
        <Box px={2} pt={1}>
          <H6>{data.user.name}</H6>
        </Box>

        <Divider />
        <NavLink href="/address" >
        <MenuItem>Adreslerim</MenuItem>
        </NavLink>
        <NavLink href="/personel-information" >
        <MenuItem>Kişisel Bilgilerim</MenuItem>
        </NavLink>

        <NavLink href="/orders" >
        <MenuItem>Satın Aldıklarım</MenuItem>
        </NavLink>
        <NavLink href="/coupons" >

        <MenuItem>Kuponlarım</MenuItem>
        </NavLink>
        <Divider />
        <MenuItem onClick={Logout}>Çıkış Yap</MenuItem>
      </Menu>
    </div>;
}