import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useToken, AuthProvider } from "./Auth";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <GetToken />
      <Routes>
        <Route path="movies" element={<Home />} />
        <Route path="movies/:imdb" element={<Detail />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}
