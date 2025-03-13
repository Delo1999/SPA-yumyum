import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData, myTenantId } from "../services/api-service";

// Define a type for the slice state
interface OrderItem {
  id: string;
  type: string;
  name: string;
  description: string;
  price: number;
  ingredients?: string[];
}

interface OrderState {
  id: string;
  items: OrderItem[];
  orderValue: number;
  eta: string;
  timestamp: string;
  state: string;
}

interface OrdersState {
  orders: OrderState[];
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

// First, create the thunk
export const fetchOrders = createAsyncThunk<
  OrderState[],
  void,
  { rejectValue: string }
>("orders/fetchOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchData(`${myTenantId}/orders`);
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    const data = await response.json();
    return data; // This should return an array of orders
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const etaSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // You can add actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; // Store orders in the state
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Handle error
      });
  },
});

// // First, create the thunk
// export const fetchOrders = createAsyncThunk("Orders", async () => {
//   const response = await fetchData(`${myTenantId}/orders`);
//   const data:  = await response.json();
//   return data;
// });

// export const etaSlice = createSlice({
//   name: "order",
//   // `createSlice` will infer the state type from the `initialState` argument
//   initialState,
//   reducers: {
//     // standard reducer logic, with auto-generated action types per reducer
//   },
//   extraReducers: (builder) => {
//     // Add reducers for additional action types here, and handle loading state as needed
//     builder.addCase(fetchOrders.fulfilled, (state, action) => {
//       // Add user to the state array
//       state.items.push(...action.payload.items);
//     });
//   },
// });

// Other code such as selectors can use the imported `RootState` type
export default etaSlice.reducer;
