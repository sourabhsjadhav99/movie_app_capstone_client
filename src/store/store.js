import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "./homeSlice";
import authSlice from "./authSlice";
import bookmarkSlice from "./bookmarkSlice";

export const store = configureStore({
    reducer: {
        home: homeSlice,
        auth: authSlice,
        bookmark:bookmarkSlice
    },
});
