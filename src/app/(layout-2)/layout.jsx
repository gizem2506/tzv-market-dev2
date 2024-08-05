"use client"
import { Footer1 } from "../../components/footer";
import ShopLayout2 from "../../components/layouts/shop-layout-2";
import Topbar from "../../components/topbar/top-bar";
export default function Layout({
  children
}) {
  return <>
    {/* <Topbar/> */}
   <ShopLayout2>{children}</ShopLayout2>;
   <Footer1/>
  </>
  
 
}