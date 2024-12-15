import Hero from "../../components/Hero";
import HeroServices from "../../components/HeroServices";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="bg-primary">
      <Header />
      <motion.div
        className="mt-20  mx-auto justify-center items-center flex flex-col gap-32"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }} 
        exit={{ x: "100%", opacity: 0 }} 
        transition={{ duration: 1.3 }} 
      >
        <Hero />
        <HeroServices />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Home;
