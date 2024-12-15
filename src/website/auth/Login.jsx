import { FaFacebook, FaInstagram, FaGooglePlus } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.post("http://localhost:8000/api/login", {
      username,
      password
    });
  }, []);

  return (
    <>
      <motion.section
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.1 }}
        className="flex justify-between bg-primary items-center   h-screen    font-bigLines "
      >
        <div className=" flex flex-col w-1/3 ml-20 h-full items-center gap-5 left-side">
          <div className="logo h-32  w-32 self-start -ml-20">
            <img
              src={logo}
              className="w-full h-full cursor-pointer"
              onClick={() => {
                location.pathname = "/";
              }}
              alt=""
            />
          </div>
          <h1 className="text-4xl capitalize">Welcome to EventDz</h1>
          <div className="socials flex items-center gap-2 py-4 text-gray-300 cursor-pointer hover:text-purple text-3xl ">
            <div className="text-gray-800 bg-purple p-3 rounded-full">
              <FaFacebook className="" />
            </div>
            <div className="text-gray-800 bg-purple p-3 rounded-full">
              <FaGooglePlus className="" />
            </div>
            <div className="text-gray-800 bg-purple p-3 rounded-full">
              <FaInstagram className="" />
            </div>
          </div>
          <p> ou bien utiliser votre email :</p>

          <form
            action=""
            className="flex flex-col  w-full h-full items-center gap-6 mt-5"
          >
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="email"
              name="email"
              id="email "
              placeholder="Email"
              className="p-2 shadow shadow-violet-950  outline-1 outline-none focus:text-sm transition-all w-9/12 h-12 rounded-2xl bg-transparent border-purple border  placeholder:text-black"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="mot de passe"
              id="mot de passe"
              placeholder="Mot de passe"
              className="p-2 shadow shadow-violet-950  outline-1 outline-none focus:text-sm transition-all w-9/12 h-12 rounded-2xl bg-transparent border-purple border  placeholder:text-black"
            />
            <button className="bg-purple  text-black p-3 w-32 shadow-inner shadow-gray-500 hover:bg-purple2 transition-all rounded-2xl">
              Sign In
            </button>
          </form>
        </div>
        <div className="right-side shadow-violet-950 shadow-2xl bg-purple w-1/2 gap-10 justify-center items-center flex flex-col rounded-tl-8xl rounded-bl-8xl h-full">
          <h1 className="text-primary text-4xl">Bienvenu , Encore une fois</h1>
          <p className="text-primary p-3 w-1/2 text-center text-wrap text-lg">
            entrez vos informations personnelles et restez connecté avec nous
          </p>
          <Link to={"/signup"}>
            <button className="bg-primary text-black p-3 w-32 shadow-inner shadow-gray-500 hover:bg-purple2 transition-all rounded-2xl">
              Sign Up
            </button>
          </Link>
        </div>
      </motion.section>
    </>
  );
};

export default Login;
