// import './App.css';
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";

// react router
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
