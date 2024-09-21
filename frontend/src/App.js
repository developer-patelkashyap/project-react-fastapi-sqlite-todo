// import './App.css';
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import TodoPage from "./pages/todo";

// react router
import { Routes, Route } from "react-router-dom";

// utils
import PrivateRoutes from "./utils/private-routes";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/todo" element={<TodoPage />} />
        </Route>
        <Route path="/" element={<SignInPage />} />
      </Routes>
    </div>
  );
}

export default App;
