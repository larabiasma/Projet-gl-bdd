import NewService from "../components/NewService";
import { useState } from "react";
import { motion } from "framer-motion";
// import axios from "axios";
const ProfilePrestataire = () => {
  // const [prenom, setPrenom] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [passConfirm, setPassConfirm] = useState("");
  // const handleAjouterInfos = async () => {
  //   await axios.post("http://localhost:8000/api/service", {
  //     prenom: prenom,
  //     email: email,
  //     password: password,
  //     passConfirm: passConfirm,
  //   });
  // };
  const [showService, setShowService] = useState(false);
  const [services, setServices] = useState([]);

  const showServiceForm = (e) => {
    e.preventDefault();
    setShowService((v) => !v);
  };

  const handleAnnuler = () => {
    setShowService(false);
  };

  return (
    <div className="flex flex-col p-3 gap-5 mt-16 font-bigLines">
      <form action="" className="flex flex-col gap-5">
        <label htmlFor="prenom" className="text-xl">
          Prénom
        </label>
        <input
          // onChange={(e) => {
          //   setPrenom(e.target.value);
          // }}
          type="text"
          name="prenom"
          id="prenom"
          placeholder="Prénom"
          className="p-2 shadow-purple placeholder:text-slate-700 placeholder:text-xl shadow-md w-1/3 h-14 hover:text-sm transition-all bg-transparent rounded-3xl outline-none"
        />

        <label htmlFor="email" className="text-xl">
          Email
        </label>
        <input
          // onChange={(e) => {setEmail(e.target.value)}}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="p-2 shadow-purple shadow-md placeholder:text-slate-700 placeholder:text-xl w-1/3 h-14 hover:text-sm transition-all bg-transparent rounded-3xl outline-none"
        />

        <label htmlFor="password" className="text-xl">
          Mot de Passe
        </label>
        <input
          // onChange={(e) => {setPassword(e.target.value)}}
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
          className="p-2 shadow-purple shadow-md placeholder:text-slate-700 placeholder:text-xl w-1/3 h-14 hover:text-sm transition-all bg-transparent rounded-3xl outline-none"
        />

        <label htmlFor="confirm-password" className="text-xl">
          Confirmation
        </label>
        <input
          // onChange={(e) => {setPassConfirm(e.target.value)}}
          type="password"
          name="confirm-password"
          id="confirm-password"
          placeholder="Confirmer le mot de passe"
          className="p-2 shadow-purple shadow-md placeholder:text-slate-700 placeholder:text-xl w-1/3 h-14 hover:text-sm transition-all bg-transparent rounded-3xl outline-none"
        />

        <button
          onClick={showServiceForm}
          className="bg-purple text-white rounded-xl w-fit h-fit p-3"
        >
          Ajouter un nouveau service
        </button>
      </form>

      <table className="bg-purple text-white w-1/2 rounded-2xl">
        <thead>
          <tr className="text-left">
            <th className="p-2">Service</th>
            <th className="p-2">Prix</th>
            <th className="p-2">Date de création</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {services.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4">
                Aucun service ajouté.
              </td>
            </tr>
          ) : (
            services.map((service, index) => (
              <tr key={index}>
                <td className="p-2">{service.name}</td>
                <td className="p-2">{service.price}</td>
                <td className="p-2">{service.date}</td>
                <td className="p-2">
                  <button className="text-red-500">Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showService && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center  w-full h-full bg-black bg-opacity-50 "
          style={{ backdropFilter: "blur(5px)" }}
        >
          <div className=" p-5 rounded-xl w-2/3 ">
            <NewService onAnnuler={handleAnnuler} />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfilePrestataire;
