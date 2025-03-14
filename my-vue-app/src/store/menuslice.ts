import { MenuItem } from "./../components/menu/Menu";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../services/api-service";

// Define a type for the slice state
interface MenuState {
  items: MenuItem[];
  status: "idle" | "loading" | "succeeded" | "failed"; // Adding a status to track the loading state
  error: string | null; // Error to capture any errors during the fetch
}

// Define the initial state using that type
const initialState: MenuState = {
  items: [],
  status: "idle",
  error: null,
};

// First, create the thunk
export const fetchMenuItems = createAsyncThunk("menuItems", async () => {
  const response = await fetchData("menu");
  const data: MenuState = await response.json();
  return data;
});

export const menuSlice = createSlice({
  name: "menu",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchMenuItems.fulfilled, (state, action) => {
      // Add user to the state array
      state.status = "succeeded"; // Set the status to succeeded when the request succeeds

      state.items.push(...action.payload.items);
    });

    builder.addCase(fetchMenuItems.pending, (state) => {
      state.status = "loading"; // Set the status to loading when the request starts
    });

    // Handle rejected state (when the async request fails)
    builder.addCase(fetchMenuItems.rejected, (state, action) => {
      state.status = "failed"; // Set the status to failed when the request fails
      state.error = action.error.message || "Failed to fetch menu items"; // Capture the error message
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export default menuSlice.reducer;
