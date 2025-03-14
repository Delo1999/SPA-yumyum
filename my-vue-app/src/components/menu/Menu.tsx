import { useEffect } from "react";
import "./menu.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToBasket } from "../../store/basketslice";
import { fetchMenuItems } from "../../store/menuslice";

export interface MenuItem {
  id: number;
  type: string;
  name: string;
  description: string;
  price: number;
  ingredients?: string[];
}

export const MenuList: React.FC = () => {
  const dispatch = useAppDispatch(); // Använda dispatch för att skicka actions till store

  const isCartOpen = useAppSelector((state) => state.order.isCartOpen);
  const menuItems = useAppSelector((state) => state.menu.items);

  useEffect(() => {
    if (menuItems.length > 0) {
      return;
    }
    dispatch(fetchMenuItems());
  }, [dispatch, menuItems]);

  const filteredMenuItems = menuItems
    // .filter((item) => item.type !== "drink")
    .map((item) => {
      // Om namnet är "Wonton Standard", ändra namnet på dippan
      if (item.name === "Wonton Standard") {
        return { ...item, name: "Wonton std" }; // Sätt ditt nya namn här
      }
      return item; // Om det inte är en dipp, lämna objektet oförändrat
    });

  return (
    <div
      className="menu"
      style={{
        backgroundImage: isCartOpen
          ? "none"
          : `url("../../../public/55949d7ebe28c56421c1160bd1905b3a.png")`,
        backgroundColor: isCartOpen ? "#eeeeee" : "#8ed8bf",
      }}
    >
      <ul className="menu__list">
        <h1 className="menu__title">Meny</h1>

        {/* Rendera de andra menyalternativen (som inte är dipsåser) */}
        {filteredMenuItems.length > 0 ? (
          filteredMenuItems.map((item, index) =>
            item.type !== "dip" && item.type !== "drink" ? (
              <li
                onClick={() => dispatch(addToBasket(item))}
                key={item.id + index}
                className="menu__item"
              >
                <div className="menu__item-header">
                  <span className="menu__item-name">{item.name}</span>
                  <span className="menu__item-dots"></span>
                  <span className="menu__item-price">{item.price} SEK</span>
                </div>
                <p className="menu__item-ingredients">
                  {item.ingredients?.join(", ")}
                </p>
              </li>
            ) : null
          )
        ) : (
          <li className="menu__no-items">No items found.</li>
        )}

        {/* Rendera dipsåser under en separat rubrik */}
        <h2 className="menu__dip-title">
          Dipsås
          <span className="menu__dip-dots"> ........................</span>
          <span className="menu__dip-price">19 SEK</span>
        </h2>
        {filteredMenuItems.some((item) => item.type === "dip") && (
          <div className="menu__dip-section">
            {filteredMenuItems
              .filter((item) => item.type === "dip")
              .map((dipItem, index) => (
                <div
                  onClick={() => dispatch(addToBasket(dipItem))}
                  key={dipItem.id + index}
                  className="menu__dip-item"
                >
                  <span className="menu__dip-item-rectangle">
                    <span className="menu__dip-item-name">{dipItem.name}</span>
                  </span>
                </div>
              ))}
          </div>
        )}

        {/* Rendera drycker under en separat rubrik */}
        <h2 className="menu__drink-title">
          Dryck
          <span className="menu__drink-dots"> ........................</span>
          <span className="menu__drink-price">19 SEK</span>
        </h2>
        {filteredMenuItems.some((item) => item.type === "drink") && (
          <div className="menu__drink-section">
            {filteredMenuItems
              .filter((item) => item.type === "drink")
              .map((drinkItem, index) => (
                <div
                  onClick={() => dispatch(addToBasket(drinkItem))}
                  key={drinkItem.id + index}
                  className="menu__drink-item"
                >
                  <span className="menu__drink-item-rectangle">
                    <span className="menu__drink-item-name">
                      {drinkItem.name}
                    </span>
                  </span>
                </div>
              ))}
          </div>
        )}
      </ul>
    </div>
  );
};

//   // Definiera tillstånd för att lagra menydatan
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]); // Typen kan anpassas beroende på API:s svar
//   const [loading, setLoading] = useState<boolean>(true); // För att visa en laddningsindikator
//   const [error, setError] = useState<string | null>(null); // För att hantera fel

//   // useEffect för att hämta menyn när komponenten laddas
//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         const response = await fetchData("menu"); // Här kan du byta "menu" till andra endpoints
//         const data: MenuResponse = await response.json(); // Om API:t returnerar JSON

//         // Filtrera bort alla drinkar
//         const menuWithoutDrinks = data.items.filter(
//           (item) => item.type !== "drink"
//         );

//         // Här ändrar vi namnet på dippsåser direkt i den data vi hämtar
//         const updatedItems = menuWithoutDrinks.map((item) => {
//           // Om namnet är "Wonton Standard", ändra namnet på dippan
//           if (item.name === "Wonton Standard") {
//             return { ...item, name: "Wonton std" }; // Sätt ditt nya namn här
//           }
//           return item; // Om det inte är en dipp, lämna objektet oförändrat
//         });

//         setMenuItems(updatedItems); // Sätt den hämtade datan i tillståndet
//         setLoading(false); // Sätt loading till false när datan har hämtats
//       } catch (err) {
//         setError("Failed to fetch menu data."); // Hantera eventuella fel
//         console.error("Failed to fetch menu data.", err);
//         setLoading(false);
//       }
//     };

//     fetchMenu(); // Anropa funktionen för att hämta data
//   }, []); // Tom array betyder att den körs när komponenten laddas för första gången

//   // Visa loading state eller felmeddelande om något går fel
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     console.log("hej123");
//     return <div>{error}</div>;
//   }

// Visa menydatan om den är hämtad
