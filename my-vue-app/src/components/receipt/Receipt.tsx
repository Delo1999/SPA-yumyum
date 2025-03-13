import { Button } from "../button/button";
import "./Receipt.scss";

const Receipt: React.FC = () => {
  return (
    <div className="receipt">
      <div className="receipt__customer">
        <span className="receipt__logo"> </span>
        <div className="receipt__title">
          Kvitto
          <div className="receipt__totalt">
            Totalt: ... <br></br>
            inkl 20% moms{" "}
          </div>
        </div>
      </div>
      <Button backgroundColor="#353131" color="#F4F3F1F0" onClick={() => {}}>
        GÖR EN NY BESTÄLLNING
      </Button>
    </div>
  );
};

export { Receipt };
