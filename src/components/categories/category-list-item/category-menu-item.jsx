import Link from "next/link";
import ChevronRight from "@mui/icons-material/ChevronRight"; 

import { Wrapper } from "./styles"; 
import Category from "@/src/icons/Category";
export default function CategoryListItem(props) {
  const {
    title,
    render,
    slug ,
    caret = true,
   
  } = props;
  return <Wrapper>
      <Link href={`/products/categories/${slug}`}>
        <div className="category-dropdown-link">
        <Category fontSize="small" color="inherit" />
          <span className="title">{title}</span>
          {caret ? <ChevronRight fontSize="small" className="caret-icon" /> : null}
        </div>
      </Link>

      {render ? <div className="mega-menu">{render}</div> : null}
    </Wrapper>;
}