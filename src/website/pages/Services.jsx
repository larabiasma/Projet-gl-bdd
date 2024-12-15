import { Link } from "react-router-dom";
import CartService from "../../components/cartService";
import Header from "../../components/Header";
import pic1 from "../../assets/service.page/photograph.png";
import pic2 from "../../assets/service.page/les salle.png";
import pic3 from "../../assets/service.page/food.png";
import pic4 from "../../assets/service.page/Décore.png";
import { motion } from "framer-motion";
const Services = () => {
  return (
    <div className="bg-primary flex flex-col justify-center  gap-10 items-center ">
      <Header />
      <motion.h1
        initial={{ x: "-50%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ duration: 1 }}
        className="font-bigLines ml-10 mt-10 text-3xl shadow-xl shadow-purple bg-transparent rounded-3xl p-2 "
      >
        Nos Services
      </motion.h1>
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 grid-rows-2 gap-20 p-5"
      >
        <Link to={"/photography"}>
          <CartService img={pic1} type={"photography"} />
        </Link>
        <Link to={"/salles"}>
          {" "}
          <CartService img={pic2} type={"les salles"} />
        </Link>
        <Link to={"/cuisinier"}>
          {" "}
          <CartService img={pic3} type={"cuisinier"} />
        </Link>
        <Link to={"/decore"}>
          {" "}
          <CartService img={pic4} type={"Decore"} />
        </Link>
      </motion.div>
    </div>
  );
};

export default Services;
