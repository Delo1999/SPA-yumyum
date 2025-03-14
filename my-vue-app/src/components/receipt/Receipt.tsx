import { Link } from "react-router";
import { useAppSelector } from "../../store/hooks";
import { Button } from "../button/Button";
import "./Receipt.scss";

const Receipt: React.FC = () => {
  const order = useAppSelector((state) => state.order.order);

  // Aggregating items: Group by name and calculate quantity and total price
  const aggregatedItems = order?.items.reduce((acc, item) => {
    // Find if the item is already in the accumulator
    const existingItem = acc.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1; // Increase the quantity
      existingItem.totalPrice += item.price; // Add the price to the total price
    } else {
      // If the item doesn't exist, add it to the accumulator with quantity 1
      acc.push({
        name: item.name,
        quantity: 1,
        totalPrice: item.price,
      });
    }
    return acc;
  }, [] as { name: string; quantity: number; totalPrice: number }[]);

  return (
    <div className="receipt">
      <div className="receipt__customer">
        <img className="receipt__logo" src="../../../public/logo.png" />
        <div className="receipt__title">
          Kvitto <br />
          Ordernummer: {order?.id}
          <div className="receipt__scroll">
            {aggregatedItems?.map((item, index) => (
              <div className="receipt__container" key={`${item.name}+${index}`}>
                <p className="receipt__name">{item.name}</p>
                <span className="receipt__dots"></span>
                <p className="receipt__quantity">Amount: {item.quantity}</p>
                <p className="receipt__total-price">
                  Total: {item.totalPrice} SEK
                </p>
              </div>
            ))}
          </div>
          <div className="receipt__totalt">
            <div className="receipt__totalt-container">
              <span>Totalt:</span>
              <span>{order?.orderValue} SEK</span>
            </div>
            <p className="receipt__moms">inkl 20% moms</p>
          </div>
        </div>
      </div>
      <Link to="/">
        <Button
          className="receipt__button"
          backgroundColor="#353131"
          color="#F4F3F1F0"
          onClick={() => {}}
        >
          GÖR EN NY BESTÄLLNING
        </Button>
      </Link>
    </div>
  );
};

export { Receipt };
