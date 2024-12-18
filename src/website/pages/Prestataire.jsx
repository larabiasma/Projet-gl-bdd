import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
const Prestataire = () => {
  return (
    <div className=" relative flex  ">
      <div className="leftside flex flex-col w-1/4 gap-10 bg-purple min-h-screen rounded-tr-3xl rounded-br-3xl">
        <div
          className="logo w-32 h-32 rounded-xl cursor-pointer"
          onClick={() => {
            window.location.pathname = "/";
          }}
        >
          <img src={logo} alt="" className="w-full h-full" />
        </div>
        <Link
          to={"/prestataire/demande"}
          className="bg-primary rounded-r-3xl opacity-65 font-bold hover:opacity-25 transition-all p-4"
        >
          Demande
        </Link>
        <Link
          to={"/prestataire/profile"}
          className="bg-primary rounded-r-3xl opacity-65 font-bold hover:opacity-25 transition-all p-4"
        >
          Gérer le profile
        </Link>
      </div>
      <div className="rightside w-3/4 bg-primary p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Prestataire;
