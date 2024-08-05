"use client" 
import Link from "next/link";
import { useState } from "react"; 
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next"; 
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Twitter from "@mui/icons-material/Twitter";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import { StyledChip, StyledContainer, StyledRoot } from "./styles"; 
import { Span } from "../Typography";
import { FlexBetween, FlexBox } from "../flex-box";


// LANGUAGE OPTIONS
const languageOptions = {
  en: {
    title: "EN",
    value: "en"
  },
  es: {
    title: "DE",
    value: "de"
  }
};
const socialLinks = [{
  id: 1,
  Icon: Twitter,
  url: "#"
}, {
  id: 2,
  Icon: Facebook,
  url: "#"
}, {
  id: 3,
  Icon: Instagram,
  url: "#"
}]; 


export default function Topbar({
  bgColor
}) {
  const {
    i18n,
    t
  } = useTranslation();
  const [expand, setExpand] = useState(false);



  return <StyledRoot bgColor={bgColor} expand={expand ? 1 : 0}>
      <StyledContainer>
        <FlexBetween width="100%">
          <FlexBox alignItems="center" gap={1}>
            <StyledChip label={t("Bize Ulaşın")} size="small" />
            <Span className="title">{t("+90 (312) 210 00 20")}</Span>
          </FlexBox>

          <IconButton disableRipple className="expand" onClick={() => setExpand(state => !state)}>
            {expand ? <Remove /> : <Add />}
          </IconButton>
        </FlexBetween>

        <FlexBox className="topbarRight" alignItems="center">
         
        

          {
          /* SOCIAL LINKS AREA */
        }
          <FlexBox alignItems="center" gap={1.5}>
            {socialLinks.map(({
            id,
            Icon,
            url
          }) => <Link href={url} key={id}>
                <Icon sx={{
              fontSize: 16
            }} />
              </Link>)}
          </FlexBox>
        </FlexBox>
      </StyledContainer>
    </StyledRoot>;
}