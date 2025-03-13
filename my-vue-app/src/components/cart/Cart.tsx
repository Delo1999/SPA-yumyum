import "./Cart.scss";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Button } from "../button/Button";
import { removeFromBasket, clearBasket } from "../../store/basketslice";

export const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const basketItems = useAppSelector((state) => state.basket.items);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromBasket(id));
  };

  const handleClearBasket = () => {
    dispatch(clearBasket());
  };

  return (
    <div className="cart">
      <h1>Varukorg</h1>
      {basketItems.length > 0 ? (
        <div>
          <ul>
            {basketItems.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price} SEK
                <button
                  className="cart__btn-remove"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Ta bort
                </button>
              </li>
            ))}
          </ul>
          <div>
            <Button
              backgroundColor="#353131"
              color="#F4F3F1F0"
              onClick={() => {}}
            >
              TAKE MY MONEY
            </Button>
          </div>
          <button className="cart__btn-clear" onClick={handleClearBasket}>
            Rensa varukorg
          </button>
        </div>
      ) : (
        <p>Din varukorg är tom.</p>
      )}
    </div>
  );
};
