import imgService from "../assets/sallefolder/2018-09-28 (1) 2.png";
import { AiOutlineUser, AiOutlineFile } from "react-icons/ai";
import { FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
const NewService = () => {
  return (
    <div className=" w-3/4 p-5 bg-purple2 rounded-3xl flex justify-between gap-5">
      <form className="flex flex-col items-start gap-5 w-3/4">
        <h1 className="text-center self-center text-2xl mb-2 ">Nouvel Service</h1>

        <div className="bg-primary flex  shadow-gray-700 shadow-2xl  items-center w-3/4  font-bigLines p-1 outline-none rounded-xl">
          <AiOutlineUser className="text-3xl text-gray-700" />
          <input
            type="text"
            placeholder="Nom de Salle"
            className=" bg-primary opacity-70  placeholder:text-gray-700 focus:text-sm transition-all font-bigLines p-2 outline-none rounded-xl"
            name="nom de salle"
            id="nom de salle"
          />
        </div>
        <div className="bg-primary flex  shadow-gray-700 shadow-2xl  items-center w-3/4  font-bigLines p-1 outline-none rounded-xl">
          <FaMapMarkerAlt className="text-3xl text-gray-700"/>
          <input
            type="text"
            placeholder="Localisation"
            className=" bg-primary opacity-70 placeholder:text-gray-700 focus:text-sm transition-all font-bigLines p-2 outline-none rounded-xl"
            name="localisation"
            id="localisation"
          />
        </div>

        <div className="bg-primary flex  shadow-gray-700 shadow-2xl  items-center w-3/4  font-bigLines p-1 outline-none rounded-xl">
          <FaDollarSign className="text-3xl text-gray-700"/>
          <input
            type="text"
            placeholder="Price"
            className=" bg-primary opacity-70 placeholder:text-gray-700 focus:text-sm transition-all font-bigLines p-2 outline-none rounded-xl"
            name="price"
            id="price"
          />
        </div>
        <div className="bg-primary flex  shadow-gray-700 shadow-2xl  items-center w-3/4  font-bigLines p-1 outline-none rounded-xl">
          <AiOutlineFile className="text-3xl text-gray-700" />

          <input
            type="file"
            placeholder="Ajouter Drive des photos"
            className=" bg-primary opacity-70 placeholder:text-gray-700 focus:text-sm transition-all font-bigLines p-2 outline-none rounded-xl"
            name="service"
            id="service"
          />
        </div>

        <label htmlFor="ServiceList" className="text-xl">ServiceList</label>
        <select name="ServiceList" id="ServiceList" className="p-2 rounded-md">
            <option value="salles">salles</option>
            <option value="photography">photography</option>
            <option value="cuisinier">cuisinier</option>
            <option value="décore">décore</option>

        </select>
        
        <label htmlFor="description" className="text-xl">Description</label>
        <textarea
          name="description"
          id="description"
          className="h-24 outline-none p-2 w-3/4 rounded-md bg-primary"
        ></textarea>
        <div className="buttons self-center">
            <button className="bg-purple ml-2 hover:opacity-55 transition-all rounded-xl w-fit h-fit p-3">Ajouter</button>
            <button className="bg-purple ml-2 hover:opacity-55 transition-all rounded-xl w-fit h-fit p-3">Annuler</button>
        </div>
      </form>
      <div className=" h-40 w-1/4">
        <img src={imgService} className="w-full h-full" alt="" />
      </div>
    </div>
  );
};

export default NewService;
