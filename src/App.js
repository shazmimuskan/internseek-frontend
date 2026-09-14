import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import Questions from "./pages/Questions";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;