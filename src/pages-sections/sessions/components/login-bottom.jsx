import { Fragment } from "react";
import BoxLink from "./box-link";
import { FlexBox, FlexRowCenter } from "../../../components/flex-box";
export default function LoginBottom() {
  return (
    <Fragment>
      <FlexRowCenter gap={1} my={3}>
        Hesabın yok mu?
        <BoxLink title="Kayıt Ol" href="/register" />
      </FlexRowCenter>

      <FlexBox
        gap={1}
        py={2}
        borderRadius={1}
        justifyContent="center"
        bgcolor="grey.200"
      >
        Parolanızı mı unuttunuz?
        <BoxLink title="Şifre Yenile" href="/forgot-password" />
      </FlexBox>
    </Fragment>
  );
}
