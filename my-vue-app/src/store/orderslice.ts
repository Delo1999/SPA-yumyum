import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData, myTenantId } from "../services/api-service";
import { MenuItem } from "../components/menu/Menu";

// Define a type for the slice state
interface CartState {
  isCartOpen: boolean;
  order: {
    id: string;
    items: MenuItem[];
    orderValue: number;
    eta: string;
    timestamp: string;
    state: string;
  } | null;
}

// Define the initial state using that type
const initialState: CartState = {
  isCartOpen: false,
  order: null,
};

export const createOrderThunk = createAsyncThunk(
  "create-order",
  async (itemIds: number[]) => {
    const response = await fetchData(`${myTenantId}/orders`, "POST", {
      items: itemIds,
    });
    const data = (await response.json()) as { order: CartState["order"] };
    return data.order;
  }
);

export const orderSlice = createSlice({
  name: "order",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrderThunk.fulfilled, (state, action) => {
      state.isCartOpen = false;
      state.order = action.payload;
    });
  },
});

export const { toggleCart } = orderSlice.actions;

export default orderSlice.reducer;
