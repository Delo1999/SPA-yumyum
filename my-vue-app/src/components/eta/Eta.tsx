import { Link } from "react-router";
import { useAppSelector } from "../../store/hooks";
import { Button } from "../button/Button";
import "./Eta.scss";

const Eta: React.FC = () => {
  const order = useAppSelector((state) => state.order.order);
  const isCartOpen = useAppSelector((state) => state.order.isCartOpen);

  function getEtaInMinutes(eta: string | null) {
    const etaDate = new Date(eta ?? "");
    const currentDate = new Date();
    const etaInMinutes = etaDate.getMinutes() - currentDate.getMinutes();

    return etaInMinutes;
  }

  return (
    <div
      className="eta"
      style={{
        backgroundColor: isCartOpen ? "#eeeeee" : "#605858",
      }}
    >
      <h1 className="eta__title">
        DINA WONTON <br></br> TILLAGAS!
      </h1>
      <div className="eta__image"> </div>
      <h2 className="eta__eta">ETA {getEtaInMinutes(order!.eta)} min</h2>
      <h3 className="eta__ordernumber">Ordernummer: {order?.id} </h3>
      <Link to="/">
        <Button
          className="eta__button-beställning"
          backgroundColor="#353131"
          color="#F4F3F1F0"
          border="none"
          onClick={() => {}}
        >
          GÖR EN NY BESTÄLLNING
        </Button>
      </Link>
      <Link to="/receipt">
        <Button
          className="eta__button-kvitto"
          backgroundColor="#605858"
          color="#F4F3F1F0"
          border="2px solid #F4F3F1F0"
          onClick={() => {}}
        >
          SE KVITTO
        </Button>
      </Link>
    </div>
  );
};

export { Eta };
