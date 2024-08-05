"use client";

import Badge from "@mui/material/Badge";
import useMediaQuery from "@mui/material/useMediaQuery"; 
import Home from "../../icons/Home";
import CategoryOutlined from "../../icons/CategoryOutline";
import useCart from "../../hooks/useCart"; 
// STYLED COMPONENTS

import { iconStyle, StyledNavLink, Wrapper } from "./styles";

export default function MobileNavigationBar() {
  const {
    state
  } = useCart();
  const DOWN_900 = useMediaQuery(theme => theme.breakpoints.down(900));

  if (DOWN_900) {
    return <Wrapper>
        {list.map(({
        Icon,
        href,
        title
      }) => <StyledNavLink href={href} key={title}>
            {title === "Cart" ? <Badge badgeContent={state.cart.length} color="primary">
                <Icon fontSize="small" sx={iconStyle} />
              </Badge> : <Icon sx={iconStyle} fontSize="small" />}

            {title}
          </StyledNavLink>)}
      </Wrapper>;
  }

  return null;
}
const list = [{
  title: "Anasayfa",
  Icon: Home,
  href: "/"
}, {
  title: "Kategoriler",
  Icon: CategoryOutlined,
  href: "/mobile-category-nav"
}];