import { Outlet } from "react-router";
import { Header } from "../header/Header";
import { useAppSelector } from "../../store/hooks";
import { Cart } from "../cart/Cart";

export function Layout() {
  const isCartOpen = useAppSelector((state) => state.order.isCartOpen);

  return (
    <section>
      <Header />
      <Outlet />
      {isCartOpen && <Cart />}
    </section>
  );
}
