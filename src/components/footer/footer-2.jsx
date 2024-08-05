import Link from "next/link";
import Grid from "@mui/material/Grid";
import SocialLinks from "./components/social-links";
import BazaarImage from "../../components/BazaarImage";

import { Heading, StyledFooter, StyledLink } from "./styles";
import { Paragraph } from "../Typography";
export default function Footer2() {
  return (
    <StyledFooter
    sx={{
      padding: 5,
      color: "white",
      borderRadius: 2,
      bgcolor: "#141850",
      mb: {
        md: 2,
        xs: 10,
      },
    }}
  >
    <Grid container spacing={6} alignItems="center">
      <Grid item sm={6} xs={12}>
        <Link href="/">
          <BazaarImage
            width={300}
            mb={2.5}
            src="/assets/images/tzv-logo.png"
            alt="logo"
          />
        </Link>
        <Grid ml={4}>
        <SocialLinks />
        </Grid>
      </Grid>
  
      <Grid item sm={6} xs={12}>
      <Heading>Bize Ulaşın</Heading>
        <Paragraph mb={2.5} color="grey.500" maxWidth="370px">
          +90 (312) 210 00 20 <br />
          +90 (312) 210 16 28
          <br />
          info@wiasoft.com
          <br />
          ODTÜ-Halıcı Yazılımevi, İnönü Bulvarı 06531, ODTÜ-Teknokent / ANKARA
        </Paragraph>
    
      </Grid>
    </Grid>
  </StyledFooter>
  
  );
}
