import { Button } from "../button/Button";
import "./Eta.scss";

const Eta: React.FC = () => {
  return (
    <div className="eta">
      <h1 className="eta__title">DINA WONTON TILLAGAS!</h1>
      <div className="eta__image"> </div>
      <h2 className="eta__eta">ETA: {}</h2>
      <h3 className="eta__ordernumber">Ordernummer: {} </h3>
      <Button
        backgroundColor="#353131"
        color="#F4F3F1F0"
        border="none"
        onClick={() => {}}
      >
        GÖR EN NY BESTÄLLNING
      </Button>{" "}
      <Button
        backgroundColor="#605858"
        color="#F4F3F1F0"
        border="2px solid #F4F3F1F0"
        onClick={() => {}}
      >
        SE KVITTO
      </Button>{" "}
    </div>
  );
};

export { Eta };
