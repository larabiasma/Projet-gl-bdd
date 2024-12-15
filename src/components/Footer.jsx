import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import  logo from '../assets/logo.png'
const Footer = () => {
  return (
    <div className="flex flex-col mt-20 gap-3 p-4 justify-center items-center font-bigLines">
          <div className="logo w-32 h-32 "><img src={logo} className="w-full h-full" alt="logo" /></div>

      <div className="email">Email: Events@.DZEvents.dz</div>
      <div className="socials flex items-center gap-2 py-4 text-purple2 cursor-pointer hover:text-purple text-2xl animate-bounce hover:animate-none">
        <FaFacebook />
        <FaInstagram />
        <FaLinkedin />
      
        <FaTwitter />
      </div>
      <hr className="bg-black h-1/2 w-full" />
      <div className="copyright font-mono">Copyright &copy; 2024 DZ-EVENT</div>
    </div>
  );
};

export default Footer;
