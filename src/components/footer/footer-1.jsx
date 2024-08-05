import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENT

import LogoSection from "./components/logo";
import SocialLinks from "./components/social-links";
// GLOBAL CUSTOM COMPONENTS

// STYLED COMPONENTS

import { Heading } from "./styles";
import { Paragraph } from "../Typography";
export default function Footer1() {
  return (
    <Box
      component="footer"
      bgcolor="#222935"
      mb={{
        sm: 0,
        xs: 7,
      }}
    >
      <Box
        component={Container}
        color="white"
        overflow="hidden"
        py={{
          sm: 10,
          xs: 4,
        }}
      >
        <Grid container spacing={7}>
          <Grid item lg={6} md={8} sm={6} xs={12}>
            <LogoSection />
          </Grid>
        
          <Grid item lg={6} md={8} sm={6} xs={12}>
            <Heading>Bize Ulaşın</Heading>

            <Paragraph py={0.6} color="grey.500">
              ODTÜ-Halıcı Yazılımevi, İnönü Bulvarı 06531, ODTÜ-Teknokent /
              ANKARA
            </Paragraph>

            <Paragraph py={0.6} color="grey.500">
              E-posta : info@tzv.org.tr
            </Paragraph>

            <Paragraph py={0.6} mb={2} color="grey.500">
              Telefon : +90 (312) 210 00 20 <br />
              +90 (312) 210 16 28
            </Paragraph>

            <SocialLinks />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
