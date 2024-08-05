import { Span } from "../../../Typography";
import { NavLink } from "../../../nav-link";

export default function LinkItem({
  href,
  title,
  ml = 4
}) {
  return <NavLink href={href} color="grey.700">
      <Span display="block" ml={ml} py={1}>
        {title}
      </Span>
    </NavLink>;
}