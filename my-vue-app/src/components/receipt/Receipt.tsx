import { Link } from "react-router";
import { useAppSelector } from "../../store/hooks";
import { Button } from "../button/Button";
import "./Receipt.scss";

const Receipt: React.FC = () => {
  const order = useAppSelector((state) => state.order.order);

  return (
    <div className="receipt">
      <div className="receipt__customer">
        <img className="receipt__logo" src="../../../public/logo.png" />
        <div className="receipt__title">
          Kvitto <br></br>
          Ordernummer: {order?.id}
          {order?.items.map((item, index) => (
            <div className="receipt__container" key={item.id + index}>
              <p className="receipt__name">{item.name}</p>
              <span className="receipt__dots"></span>
              <p className="receipt__price">{item.price} SEK</p>
            </div>
          ))}
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
