"use client";

import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import useMediaQuery from "@mui/material/useMediaQuery"; 
// CUSTOM ICON COMPONENTS

import Home from "../../icons/Home";
import CategoryOutlined from "../../icons/CategoryOutline";

import useCart from "../../hooks/useCart"; 
import { iconStyle, StyledBox, StyledDrawer, StyledNavLink, Wrapper } from "./styles";

export default function MobileNavigationBar2({
  children
}) {
  const {
    state
  } = useCart();
  const [open, setOpen] = useState(false);
  const DOWN_900 = useMediaQuery(theme => theme.breakpoints.down(900));

  const handleDrawerClose = () => setOpen(false);

  const handleDrawerToggle = () => setOpen(state => !state);

  if (DOWN_900) {
    return <Box position="relative" display="flex" flexDirection="column">
        <StyledDrawer open={open} anchor="left" onClose={handleDrawerClose}>
          {children}
        </StyledDrawer>

        <Wrapper>
          {list.map(({
          Icon,
          title,
          href
        }) => {
          
// LINK INNER CONTENTS
          const ICON = <Icon sx={iconStyle} fontSize="small" />;
          const CONTENT = <Fragment>
                {title === "Cart" ? <Badge badgeContent={state.cart.length} color="primary">
                    {ICON}
                  </Badge> : ICON}

                {title}
              </Fragment>;
          return href ? <StyledNavLink key={title} href={href}>
                {CONTENT}
              </StyledNavLink> : <StyledBox key={title} onClick={handleDrawerToggle}>
                {CONTENT}
              </StyledBox>;
        })}
        </Wrapper>
      </Box>;
  }

  return null;
}
const list = [{
  title: "Anasayfa",
  Icon: Home,
  href: "/"
}, {
  title: "Kategoriler",
  Icon: CategoryOutlined
}];