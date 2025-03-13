import orderReducer from "./orderslice";
import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./basketslice";
import menuSliceReducer from "./menuslice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    menu: menuSliceReducer,
    order: orderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>; // För att få typ på global state
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
