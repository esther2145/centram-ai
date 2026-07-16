import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Events from "./pages/Events";
import Apply from "./pages/Apply";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return <><Navbar /><Routes><Route path="/" element={<Home />} /><Route path="/courses" element={<Courses />} /><Route path="/about" element={<About />} /><Route path="/events" element={<Events />} /><Route path="/apply" element={<Apply />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes><Footer /></>;
}
