import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Nav from "./pages/nav/Nav";
import Favorites from './pages/Favorites'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/:imdb" element={<Detail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}
