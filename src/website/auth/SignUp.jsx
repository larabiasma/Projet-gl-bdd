import { FaFacebook, FaInstagram, FaGooglePlus } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        username,
        email,
        password1,
      });

      if (response.status === 201) {
        setSuccess("Compte créé avec succès !");
        setError("");
      }
    } catch (error) {
      setError("Une erreur est survenue lors de la création du compte.", error);
      setSuccess("");
    }
  };

  return (
    <>
    
      <motion.section
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-80%" }}
        transition={{ duration: 0.1 }}
        className="flex justify-between items-center bg-primary h-screen font-bigLines"
      >
        
        
        
        <div className="right-side bg-purple w-1/2 gap-10 justify-center items-center flex flex-col rounded-tr-8xl rounded-br-8xl h-full">

       

          <h1 className="text-primary text-4xl">COMPTE DE CRÉATION</h1>
          <p className="text-primary p-3 w-1/2 text-center text-wrap text-lg">
            Pour rester en contact avec nous, entrez vos informations
            personnelles.
          </p>
          <Link to={"/login"}>
            <button className="bg-primary text-black p-3 w-32 shadow-inner shadow-gray-500 hover:bg-purple2 transition-all rounded-2xl">
              Sign In
            </button>
          </Link>
        </div>
        <div className="flex justify-end flex-col w-1/3 ml-20 h-full items-center gap-5 left-side p-5">
          <div className="logo h-32 w-32 self-end">
            <img
              src={logo}
              className="w-full h-full cursor-pointer"
              onClick={() => {
                location.pathname = "/";
              }}
              alt=""
            />
          </div>
          <h1 className="text-4xl">Bienvenue à EventDz</h1>
          <div className="socials flex items-center gap-2 py-4 text-gray-300 cursor-pointer hover:text-purple text-3xl">
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
          <p>Ou bien utilisez votre email :</p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full h-full items-center gap-6 mt-5"
          >
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Nom d'utilisateur"
              className="p-2 outline-1 shadow shadow-violet-950 outline-none focus:text-sm transition-all w-9/12 h-12 rounded-2xl bg-transparent border-purple border placeholder:text-black"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="p-2 outline-1 shadow shadow-violet-950 outline-none focus:text-sm transition-all w-9/12 h-12 rounded-2xl bg-transparent border-purple border placeholder:text-black"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Mot de passe"
              className="p-2 outline-1 shadow shadow-violet-950 outline-none focus:text-sm transition-all w-9/12 h-12 rounded-2xl bg-transparent border-purple border placeholder:text-black"
            />
        
            <button
              type="submit"
              className="bg-purple text-black p-3 w-32 shadow-inner shadow-gray-500 hover:bg-purple2 transition-all rounded-2xl"
            >
              Sign Up
            </button>
          </form>
        </div>
      </motion.section>
    </>
  );
};

export default SignUp;
