import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./header.scss";
import { toggleCart } from "../../store/orderslice";

const Header: React.FC = () => {
  const basketItems = useAppSelector((state) => state.basket.items);
  const dispatch = useAppDispatch();
  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  const isCartOpen = useAppSelector((state) => state.order.isCartOpen);
  console.log("iscartopen", isCartOpen);

  return (
    <div className="header">
      <div className="header__rectangle">
        <h1 className="header__logo-text">
          YY<br></br>GS
        </h1>
      </div>
      <div onClick={handleToggleCart} className="header__logo">
        <div className="header__logo-basket"></div>
        <span className="header__logo-count">{basketItems.length}</span>
      </div>
    </div>
  );
};

export { Header };
