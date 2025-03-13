import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuItem } from "../components/menu/Menu";

interface BasketState {
  items: MenuItem[];
}

const initialState: BasketState = {
  items: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Lägg till en artikel i varukorgen
    addToBasket(state, action: PayloadAction<MenuItem>) {
      state.items.push(action.payload);
    },
    // Ta bort en artikel från varukorgen
    removeFromBasket(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    // Rensa varukorgen
    clearBasket(state) {
      state.items = [];
    },
  },
});

export const { addToBasket, removeFromBasket, clearBasket } =
  basketSlice.actions;
export default basketSlice.reducer;
