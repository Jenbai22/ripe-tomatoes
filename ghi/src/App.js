import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Nav from "./pages/nav/Nav";
import Favorites from "./pages/Favorites";

const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, "");

return (
  <BrowserRouter basename={basename}>
    <Nav />
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="/:imdb" element={<Detail />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  </BrowserRouter>
);
