// import { useState } from "react";
import Calendar from "./Calendar";
import { FaSearch } from "react-icons/fa";

const Demande = () => {
  // const [clients, setClients] = useState({});
  return (
    <div className="flex flex-col justify-center gap-10 items-start">
      <div className="searchBar flex items-center justify-between w-2/4 bg-white p-2 rounded-lg">
        <input
          type="search"
          name=""
          id=""
          className="w-3/4 rounded-lg p-1 "
          placeholder="Rechercher quelqu'un ..."
        />
        <FaSearch className="text-gray-500" />
      </div>
      <h1 className="font-bigLines text-2xl">Les Clients :</h1>
      <div className="clients-table">
        <table>
          <thead className="rounded-lg">
            <tr className="bg-purple p-4  font-bigLines rounded-lg">
              <th className="p-4 rounded-lg">Nom-comp</th>
              <th className="p-4 rounded-lg">Numero</th>
              <th className="p-4 rounded-lg">La date</th>
              <th className="p-4 rounded-lg">Nbr-jours</th>
              <th className="p-4 rounded-lg">Prix</th>
              <th className="p-4 rounded-lg">Confirmation</th>
            </tr>
          </thead>
          <tbody className="bg-purple2">
            {/* {clients.map((client, index) => {
              <tr key={index}>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
              </tr>;
            })} */}
          </tbody>
        </table>
      </div>

      <div className="calendar self-center">
        <Calendar />
      </div>
    </div>
  );
};

export default Demande;
