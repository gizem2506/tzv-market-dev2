import Image from "next/image";
import FlexRowCenter from "../../../components/flex-box/flex-row-center";
import logo from "../../../../public/assets/images/tzv-logo.png";
export default function LogoWithTitle() {
  return (
    <FlexRowCenter flexDirection="column" gap={1.5} mb={4}>
      <Image src={logo} width={300} alt="bazaar" />
    </FlexRowCenter>
  );
}
