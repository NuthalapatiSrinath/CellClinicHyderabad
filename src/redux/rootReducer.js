import navBarSlice from "./slices/navBarSlice";
import modalSlice from "./slices/modalSlice";
import themeSlice from "./slices/themeSlice"; // Import new slice

const rootReducer = {
  navBar: navBarSlice,
  modal: modalSlice,
  theme: themeSlice, // Add it here
};

export default rootReducer;
