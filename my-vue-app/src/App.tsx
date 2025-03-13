import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";

import { Provider } from "react-redux";
import { store } from "./store/store";

import { MenuList } from "./components/menu/Menu";
import { Eta } from "./components/eta/Eta";
import { Receipt } from "./components/receipt/Receipt";

import { Layout } from "./components/layout/Layout";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MenuList />} />
            <Route path="eta" element={<Eta />} />
            <Route path="receipt" element={<Receipt />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
