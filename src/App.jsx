import { AppProvider } from "./context/AppContext";
import { AppRouter } from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
