import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import WebRoutes from "./Authentication/webRoutes";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Function to delete our give cache
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  }, [])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WebRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
