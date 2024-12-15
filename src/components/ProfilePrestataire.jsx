import NewService from "../components/NewService";
import { useState } from "react";

const ProfilePrestataire = () => {
  const [showService, setShowService] = useState(false);
  const showServiceForm = (e) => {
    setShowService((v) => !v);
    window.style.backdropFilter='blur-1'
    e.preventDefault();
  };
  return (
    <form action =  "" className="flex flex-col p-3 gap-5 mt-16 font-bigLines">
      <label htmlFor="prenom" className="text-xl">
        Prénom
      </label>
      <input
        type="text"
        name="prenom"
        id="prenom"
        placeholder="prénom"
        className="p-2 shadow-purple placeholder:text-slate-700 placeholder:text-xl shadow-md  w-1/3 h-14  hover:text-sm transition-all bg-transparent rounded-3xl outline-none"
      />

      <label htmlFor="email" className="text-xl ">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"

        placeholder="email"

        className="p-2 shadow-purple shadow-md placeholder:text-slate-700 placeholder:text-xl  w-1/3 h-14 hover:text-sm transition-all bg-transparent rounded-3xl outline-none"
      />

      <label htmlFor="password" className="text-xl ">
        Mot De Passe
      </label>

      <input
        type="password"
        name="password"
        id="password"
        className="p-2 shadow-purple shadow-md placeholder:text-slate-700 placeholder:text-xl  w-1/3 h-14 hover:text-sm transition-all bg-transparent rounded-3xl outline-none"
      />
      <label htmlFor="confirm-password" className="text-xl ">
        Confirmation
      </label>

      <input
        type="password"
        name="confirm-password"
        id="confirm-password"
        className="p-2 shadow-purple shadow-md w-1/3 h-14 placeholder:text-slate-700 placeholder:text-xl  hover:text-sm transition-all bg-transparent rounded-3xl outline-none"
      />
      <button
        onClick={(e) => showServiceForm(e)}
        className="bg-purple rounded-xl w-fit h-fit p-3"
      >
        Ajouter nouvel service
      </button>
      <table className="bg-purple w-1/2 rounded-2xl ">
        <thead>
          <th className=" flex items-center gap-9 p-2 ">
            <td>Service</td>
            <td>Prix</td>
            <td>Date de creation</td>
            <td>Ajoutation</td>
          </th>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button></button>
            </td>
          </tr>
        </tbody>
      </table>
      {showService ? (
        <div className={`absolute w-3/4`}>
          <NewService />
        </div>
      ) :''}
    </form>
  );
};

export default ProfilePrestataire;
