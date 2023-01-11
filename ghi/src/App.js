import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Login";
import UserList from "./UsersList";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  return (
    <BrowserRouter basename={basename}>
      <div className="container">
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
