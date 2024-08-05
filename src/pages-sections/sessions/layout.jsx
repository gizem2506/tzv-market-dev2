"use client";

import { usePathname } from "next/navigation";
import BoxLink from "./components/box-link";
import LogoWithTitle from "./components/logo-title";
import LoginBottom from "./components/login-bottom";

import { FlexRowCenter } from "../../components/flex-box";
import { Wrapper } from "./styles";
export default function AuthLayout({ children }) {
  const pathname = usePathname();
  let BOTTOM_CONTENT = null;

  if (pathname === "/login") {
    BOTTOM_CONTENT = <LoginBottom />;
  }

  if (pathname === "/register") {
    BOTTOM_CONTENT = (
      <FlexRowCenter gap={1} mt={3}>
        Hesabın var mı ?
        <BoxLink title="Giriş Yap" href="/login" />
      </FlexRowCenter>
    );
  }

  if (pathname === "/forgot-password") {
    return (
      <FlexRowCenter flexDirection="column" minHeight="100vh" px={2}>
        <Wrapper elevation={3}>{children}</Wrapper>
      </FlexRowCenter>
    );
  }

  return (
    <FlexRowCenter flexDirection="column" minHeight="100vh" px={2}>
      <Wrapper elevation={3}>
        <LogoWithTitle />

        {children}

        {BOTTOM_CONTENT}
      </Wrapper>
    </FlexRowCenter>
  );
}
