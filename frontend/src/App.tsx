import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ItemList from "./ItemList";
import AdminMoviePage from "./pages/AdminMoviePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/adminpage" element={<AdminMoviePage />} />
      </Routes>
    </Router>
  );
}

export default App;
