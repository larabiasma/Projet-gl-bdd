import CartService from "./cartService";
import pic1 from "../assets/services2.jpeg";
import pic2 from "../assets/Mini-wedding romântico no Ville La Rochelle_ Laíla Macedo + Thaigo dos Santos.jpeg";
import pic3 from '../assets/image.png'
import { motion } from "framer-motion";
const HeroServices = () => {
  return (
    <div className="flex flex-col mt-20 w-10/12 mx-auto justify-center gap-10 items-center font-bigLines ">
      <h1 className="text-black text-4xl font-bigLines ">Nos Services</h1>
      <motion.div className="services flex gap-5 items-center justify-evenly"
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{duration:3}}


      
      >
        
        <CartService
          img={pic2}
          rounded={"rounded-b-3xl rounded-tl-8xl  rounded-tr-3xl"}
          type={'photography'}
        />
                <CartService img={pic3} type={'decore'} />


        <CartService
          img={pic1}
          rounded={"rounded-b-4xl rounded-tl-3xl  rounded-8xl"}
          type={'Les Salles'}

        />
      </motion.div>
      <button className="btn_purple2 text-black w-32 shadow-purple2 hover:bg-purple2 transition-all shadow-inner ">voir Plus</button>
    </div>
  );
};

export default HeroServices;
