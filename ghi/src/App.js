import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Nav from"./pages/nav/Nav"
import { useToken, AuthProvider } from "./Auth";

function GetToken() {
  useToken();
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <Nav/>
      <GetToken />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/:imdb" element={<Detail />} />
      </Routes>
    </AuthProvider>
  );
}
