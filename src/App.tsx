import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignupPage } from "./pages/Signup";
import { LoginPage } from "./pages/Login";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
