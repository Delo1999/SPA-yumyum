import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CartState {
  isCartOpen: boolean;
}

// Define the initial state using that type
const initialState: CartState = {
  isCartOpen: false,
};

export const orderSlice = createSlice({
  name: "order",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const { toggleCart } = orderSlice.actions;

export default orderSlice.reducer;
