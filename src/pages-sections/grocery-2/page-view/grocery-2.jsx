import { Footer2 } from "../../../components/footer";
import Scrollbar from "../../../components/scrollbar";
import StickyWrapper from "../../../components/sticky-wrapper";
import GrocerySideNav from "../../../components/page-sidenav/grocery-side-nav";
import { MobileNavigationBar2 } from "../../../components/mobile-navigation";

import Section1 from "../section-1";
import Section2 from "../section-2";
import ProductCarousel from "../product-carousel";

import api from "../../../utils/__api__/grocery-2";

export async function getServerSideProps() {
  const services = await api.getServices();
  const mainCarouselData = await api.getMainCarousel();

  return {
    props: {
      services,
      mainCarouselData
    }
  };
}

export default function GroceryTwoPageView({ services, mainCarouselData }) {
  const SideNav = <GrocerySideNav />;
  return (
    <div className="mt-1">
      <StickyWrapper SideNav={SideNav}>
        <Section1 carouselData={mainCarouselData} />

        <Section2 services={services} />

        <ProductCarousel title="Yeni Gelenler" />

        <Footer2 />
      </StickyWrapper>

      <MobileNavigationBar2>
        <Scrollbar>{SideNav}</Scrollbar>
      </MobileNavigationBar2>
    </div>
  );
}
