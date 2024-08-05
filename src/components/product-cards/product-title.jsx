import { H3 } from "../Typography";

export default function ProductTitle({
  title,
}) {
  return <>
      <H3 mb={1} ellipsis title={title} fontSize={14} fontWeight={600} className="title" color="text.secondary">
        {title}
      </H3>
    </>
}