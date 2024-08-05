"use client";
import { Divider } from "@mui/material";
import Header from "../../../components/header";
import { SearchInput } from "../../../components/search-box";
import Sticky from "../../../components/sticky";
import Topbar from "../../../components/topbar";
import { usePathname } from "next/navigation";
import { GroceryTwoPageView } from "../../../pages-sections/grocery-2/page-view";
import { Fragment, useCallback, useState } from "react";
import { Navbar } from "@/src/components/navbar";

export default function IndexPageView() {
  const pathname = usePathname();
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed) => setIsFixed(fixed), []);

  let NAV_BAR_CONTENT = null;
  const SHOW_NAV_BAR = ["/checkout-alternative"];
  if (SHOW_NAV_BAR.includes(pathname))
    NAV_BAR_CONTENT = <Navbar elevation={0} />;
  return (
    <Fragment>
      <Topbar />

      <Sticky onSticky={toggleIsFixed}>
        <Header isFixed={isFixed} midSlot={<SearchInput />} />
      </Sticky>

      {NAV_BAR_CONTENT ?? <Divider />}

      <GroceryTwoPageView />
    </Fragment>
  );
}
