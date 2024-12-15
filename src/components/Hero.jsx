import heroPic from "../assets/6e75686c-bdaa-4d43-b2ca-ac8cceb5f8c1.jpeg";
import heroPic2 from "../assets/Elegant & grand wedding ceremony arch.jpeg";
import heroPic3 from "../assets/Luxury Destination Wedding in Greece _ Mazi Event.jpeg";
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <motion.section className="w-3/4 flex justify-between items-center "
    initial={{ x: "-40%", opacity: 0 }} 
    animate={{ x: 0, opacity: 1 }} 
    exit={{ x: "100%", opacity: 0 }} 
    transition={{ duration: 2 }} 
    >
      <div className="description flex flex-col items-start gap-10 w-2/3 font-bigLines">
        <h1 className="font-thin text-10 text-shadow shadow-md  bg-transparent px-2 ">
          Bienvenue dans EventDz
        </h1>
        <p className="text-xl w-3/4 text-start">
          Nous organisons des événements tels que mariages, fêtes, et
          cérémonies, en offrant des services complets pour une expérience
          inoubliabe
        </p>
        <button className="w-fit h-fit p-3 text-black bg-purple hover:bg-purple2 transition-all shadow-inner shadow-gray-500  rounded-lg">
créez votre evenement        </button>
      </div>
      <motion.div className="heroPics flex h-full   "
      
      initial={{ x: "-100%", opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.5 }} 
      >
        <div className="hero-pics w-72 h-96 relative ">
          <img
            src={heroPic}
            className="w-full h-full rounded-3xl shadow-black shadow-2xl"
            alt="heroPic"
          />

          <div className="hero-pics w-44 h-44 absolute -bottom-10 -left-14   ">
            <img
              src={heroPic2}
              alt="heroPic"
              className="w-full h-full rounded-t-full rounded-b-md shadow-black shadow-2xl"
            />
          </div>
          <div className="hero-pics w-44 h-44 absolute -bottom-10 -right-10  ">
            <img
              src={heroPic3}
              alt="heroPic"
              className="w-full h-full rounded-md shadow-purple2 shadow-2xl"
            />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
