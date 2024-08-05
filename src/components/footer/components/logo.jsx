import { Fragment } from "react";
import Link from "next/link";
import Image from "../../../components/BazaarImage";
import { Paragraph } from "../../Typography";
export default function LogoSection() {
  return (
    <Fragment>
      <Link href="/">
        <Image
          mb={2.5}
          width={250}
          src="/assets/images/tzv-logo.png"
          alt="logo"
        />
      </Link>

      <Paragraph mb={2.5} color="grey.500">
        Türkiye Zeka Vakfı, zekâ ve akıl oyunları konularında farkındalık
        yaratmayı, bireylerin zihinsel kapasitelerini geliştirmeyi ve topluma
        katkıda bulunmayı amaçlayan bir kuruluştur.
      </Paragraph>
    </Fragment>
  );
}
