import { useState } from "react";
import imgService from "../assets/sallefolder/2018-09-28 (1) 2.png";
import { AiOutlineUser, AiOutlineFile } from "react-icons/ai";
import { FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

const NewService = ({ onAnnuler }) => {
  const [nomSalle, setNomSalle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState(null);
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");

  const handleAjouterService = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const formData = new FormData();
      formData.append("nomSalle", nomSalle);
      formData.append("location", location);
      formData.append("price", price);
      formData.append("photo", photo);
      formData.append("service", service);
      formData.append("description", description);

      await axios.post("http://localhost:8000/api/service", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Service added successfully!");
      onAnnuler();
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service. Please try again.");
      onAnnuler();
    }
  };

  return (
    <div className="w-3/4 p-5 bg-purple2 rounded-3xl flex justify-between gap-5">
      <form className="flex flex-col items-start gap-5 w-3/4">
        <h1 className="text-center self-center text-2xl mb-2">
          Nouvel Service
        </h1>

        {/* Nom de Salle */}
        <div className="bg-primary flex shadow-gray-700 shadow-2xl items-center w-3/4 font-bigLines p-1 rounded-xl">
          <AiOutlineUser className="text-3xl text-gray-700" />
          <input
            onChange={(e) => setNomSalle(e.target.value)}
            type="text"
            placeholder="Nom de Salle"
            className="bg-primary opacity-70 placeholder:text-gray-700 focus:text-sm transition-all font-bigLines p-2 outline-none rounded-xl"
          />
        </div>

        {/* Localisation */}
        <div className="bg-primary flex shadow-gray-700 shadow-2xl items-center w-3/4 font-bigLines p-1 rounded-xl">
          <FaMapMarkerAlt className="text-3xl text-gray-700" />
          <input
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="Localisation"
            className="bg-primary opacity-70 placeholder:text-gray-700 focus:text-sm transition-all font-bigLines p-2 outline-none rounded-xl"
          />
        </div>

        {/* Price */}
        <div className="bg-primary flex shadow-gray-700 shadow-2xl items-center w-3/4 font-bigLines p-1 rounded-xl">
          <FaDollarSign className="text-3xl text-gray-700" />
          <input
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Price"
            className="bg-primary opacity-70 placeholder:text-gray-700 focus:text-sm transition-all font-bigLines p-2 outline-none rounded-xl"
          />
        </div>

        {/* File Upload */}
        <div className="bg-primary flex shadow-gray-700 shadow-2xl items-center w-3/4 font-bigLines p-1 rounded-xl">
          <AiOutlineFile className="text-3xl text-gray-700" />
          <input
            onChange={(e) => setPhoto(e.target.files[0])}
            type="file"
            className="bg-primary opacity-70 placeholder:text-gray-700 focus:text-sm transition-all font-bigLines p-2 outline-none rounded-xl"
          />
        </div>

        {/* Service List */}
        <label htmlFor="ServiceList" className="text-xl">
          Service List
        </label>
        <select
          onChange={(e) => setService(e.target.value)}
          name="ServiceList"
          id="ServiceList"
          className="p-2 rounded-md"
        >
          <option value="salles">Salles</option>
          <option value="photography">Photography</option>
          <option value="cuisinier">Cuisinier</option>
          <option value="décore">Décore</option>
        </select>

        {/* Description */}
        <label htmlFor="description" className="text-xl">
          Description
        </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          id="description"
          className="h-24 outline-none p-2 w-3/4 rounded-md bg-primary"
        ></textarea>

        {/* Buttons */}
        <div className="buttons self-center">
          <button
            onClick={handleAjouterService}
            className="bg-purple ml-2 hover:opacity-55 transition-all rounded-xl w-fit h-fit p-3"
          >
            Ajouter
          </button>
          <button
            onClick={onAnnuler}
            className="bg-purple ml-2 hover:opacity-55 transition-all rounded-xl w-fit h-fit p-3"
          >
            Annuler
          </button>
        </div>
      </form>

      {/* Image Section */}
      <div className="h-40 w-1/4">
        <img src={imgService} className="w-full h-full" alt="Service Preview" />
      </div>
    </div>
  );
};

export default NewService;
