import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import useCart from "../../hooks/useCart";
import TopHeader from "./components/top-header";
import MiniCartItem from "./components/cart-item";
import BottomActions from "./components/bottom-actions";
import EmptyCartView from "../mini-cart/components/empty-view";
import Scrollbar from "../../components/scrollbar";

import { currency } from "../../lib";

export default function MiniCart({ toggleSidenav }) {
  const { push } = useRouter();
  const { state, dispatch } = useCart();
  const cartList = state.cart; 

  const handleCartAmountChange = (amount, product) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product, quantity: amount },
    });
  };

  const getTotalPrice = () => {
    return cartList.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleNavigate = (path) => () => {
    toggleSidenav();
    push(path);
  };

  return (
    <Box width="100%" minWidth={380}>
      {/* HEADING SECTION */}
      <TopHeader toggle={toggleSidenav} total={cartList.length} />

      <Divider />

      <Box height={`calc(100vh - ${cartList.length ? "207px" : "75px"})`}>
        {cartList.length > 0 ? (
          <Scrollbar>
            {cartList.map((item) => (
              <MiniCartItem
                item={item}
                key={item.id}
                handleCartAmountChange={handleCartAmountChange}
              />
            ))}
          </Scrollbar>
        ) : (
          <EmptyCartView />
        )}
      </Box>

      {/* CART BOTTOM ACTION BUTTONS */}
      {cartList.length > 0 ? (
        <BottomActions
          total={currency(getTotalPrice())}
          handleNavigate={handleNavigate}
        />
      ) : null}
    </Box>
  );
}
