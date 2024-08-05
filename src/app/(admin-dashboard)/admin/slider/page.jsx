import { SliderPageView } from "../../../../pages-sections/vendor-dashboard/slider"; 
import api from "../../../../utils/__api__/dashboard";
export const metadata = {
  title: "Sliders - TZV Market",
  description: ``,
  authors: [{
    name: "",
    url: ""
  }],
  keywords: []
};
export default async function Sliders() {
  const sliders = await api.sliders();
  return <SliderPageView products={sliders} />;
}