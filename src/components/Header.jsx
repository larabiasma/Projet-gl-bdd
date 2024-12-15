import NavBar from "./NavBar";
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";
const Header = () => {

  return (
    <div className=" flex w-3/4 mx-auto justify-between gap-10 items-center container  h-16 py-2  text-lg  font-mono ">
      <div className="logo w-32 h-32 "><img src={logo} className="w-full h-full" alt="logo" /></div>
      <NavBar containerStyles={'flex   font-bigLines text-md  items-center gap-20  '} />
      <div className="buttons flex justify-center font-bigLines items-center gap-5  ">
        <Link to={'/login'} className="bg-purple w-fit h-fit p-2 rounded-xl text-black hover:bg-purple2 hover:rounded-full  transition-all shadow-inner shadow-gray-500 ">Login</Link>
        <Link to={'/signup'} className="bg-purple w-fit h-fit p-2 rounded-xl text-black hover:bg-purple2 hover:rounded-full  transition-all shadow-inner shadow-gray-500 ">Sign up</Link>
      </div>
    </div>
  );
};

export default Header;
