import "./Cart.scss";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Button } from "../button/Button";
import { removeFromBasket, clearBasket } from "../../store/basketslice";
import { createOrderThunk } from "../../store/orderslice";
import { useNavigate } from "react-router";

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const basketItems = useAppSelector((state) => state.basket.items);
  const itemIds = basketItems.map((item) => item.id);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromBasket(id));
  };

  const handleClearBasket = () => {
    dispatch(clearBasket());
  };

  // Aggregating items: Group by name and calculate quantity and total price
  const aggregatedItems = basketItems.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1; // Increase the quantity
      existingItem.totalPrice += item.price; // Add the price to the total price
    } else {
      acc.push({
        name: item.name,
        quantity: 1,
        totalPrice: item.price,
        id: item.id,
      });
    }
    return acc;
  }, [] as { name: string; quantity: number; totalPrice: number; id: number }[]);

  return (
    <div className="cart">
      {basketItems.length > 0 ? (
        <div className="cart__container">
          <ul className="cart__ulist">
            {aggregatedItems.map((item, index) => (
              <li className="cart__item" key={`${item.name}-${index}`}>
                <p className="cart__item-name">{item.name}</p>
                <span className="cart__dots"></span>
                <p className="cart__item-quantity">Antal: {item.quantity}</p>
                <p className="cart__item-total-price">
                  Totalt: {item.totalPrice} SEK
                </p>
                <button
                  className="cart__btn-remove"
                  onClick={() => handleRemoveItem(item.id)} // Remove based on item name (or ID if you prefer)
                >
                  Ta bort
                </button>
              </li>
            ))}
          </ul>
          <button className="cart__btn-clear" onClick={handleClearBasket}>
            Rensa varukorg
          </button>
          <div className="cart__total">
            <div className="cart__total-container">
              <span>Totalt:</span>
              <span>
                {aggregatedItems.reduce(
                  (total, item) => total + item.totalPrice,
                  0
                )}{" "}
                SEK
              </span>
            </div>
          </div>
          <div className="cart__btn-buy-container">
            <Button
              className="cart__btn-buy"
              backgroundColor="#353131"
              color="#F4F3F1F0"
              onClick={async () => {
                await dispatch(createOrderThunk(itemIds));
                navigate("/eta");
              }}
            >
              TAKE MY MONEY
            </Button>
          </div>
        </div>
      ) : (
        <p className="cart__empty">Din varukorg är tom.</p>
      )}
    </div>
  );
};
