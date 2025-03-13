import { MenuItem } from "./../components/menu/Menu";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../services/api-service";

// Define a type for the slice state
interface MenuState {
  items: MenuItem[];
}

// Define the initial state using that type
const initialState: MenuState = {
  items: [],
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
      state.items.push(...action.payload.items);
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export default menuSlice.reducer;
