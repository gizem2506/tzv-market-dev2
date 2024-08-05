import Link from "next/link"; 
import Box from "@mui/material/Box"; 
import LazyImage from "../../../components/LazyImage"; 

import ColumnList from "./column-list"; 
export default function MegaMenu1({
  banner,
  data
}) {
  return <ColumnList list={data} banner={banner}>
      {banner?.position === "bottom" ? <Link href={banner.href}>
          <Box position="relative" height={150} width="100%">
            <LazyImage fill alt="banner" src={banner.url} sx={{
          objectFit: "cover",
          objectPosition: "center center"
        }} />
          </Box>
        </Link> : null}
    </ColumnList>;
}