import { Provider } from "react-redux";
import { store } from "./store";
import MainApp from "./components/MainApp";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;
