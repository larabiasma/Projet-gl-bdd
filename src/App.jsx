import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SignUp from "./website/auth/SignUp";
import Login from "./website/auth/Login";
import Home from "./website/pages/Home";
import Services from "./website/pages/Services";
import Photography from "./website/pages/Photography";
import Cuisinier from "./website/pages/cuisinier";
import Salles from "./website/pages/salles";
import Decore from "./website/pages/decore";
import Prestataire from "./website/pages/Prestataire";
import ProfilePrestataire from "./components/ProfilePrestataire";
import Demande from "./components/Demande";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />}></Route>
        <Route path="/photography" element={<Photography />}></Route>
        <Route path="/cuisinier" element={<Cuisinier />}></Route>
        <Route path="/salles" element={<Salles />}></Route>
        <Route path="/decore" element={<Decore />}></Route>
        <Route path="/prestataire" element={<Prestataire />}>
          <Route path="demande" element={<Demande />}></Route>
          <Route path="profile" element={<ProfilePrestataire />}></Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
