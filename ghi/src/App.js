import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="movies" element={<Home />} />
        <Route path="movies/:imdb" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
