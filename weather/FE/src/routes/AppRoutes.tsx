import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import  Saved from "../pages/Saved";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </BrowserRouter>
  );
}