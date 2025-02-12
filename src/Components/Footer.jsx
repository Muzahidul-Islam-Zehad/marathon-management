import { useContext } from "react";
import { contextProvider } from "../Providers/AuthProvider";

const Footer = () => {
  const {isDark} = useContext(contextProvider);
  return (
    <footer className={`${isDark ?`bg-[#242424]` : `bg-base-200`}  py-8`}>
      <div className=" w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* About Section */}
        <div>
          <h2 className={`text-xl font-bold mb-4 ${isDark ? `text-[#d69327]` : `text-primary`}`}>About Us</h2>
          <p className={`${isDark ? `text-white` : `text-neutral`}`}>
            Marathon Management is dedicated to organizing and managing
            world-class marathon events. Join us to experience the thrill of
            the race and achieve your personal best.
          </p>
        </div>


        {/* Contact Section */}
        <div>
          <h2 className={`text-xl font-bold mb-4 ${isDark ? `text-[#d69327]` : `text-primary`}`}>Contact Us</h2>
          <p className={`${isDark ? `text-white` : `text-neutral`}`}>
            Email: <a href="mailto:info@marathon.com" className={`hover:underline ${isDark ? 'text-[#d69327]' : 'text-primary'}`}>info@marathon.com</a>
          </p>
          <p className={`${isDark ? `text-white` : `text-neutral`}`}>Phone: +123-456-7890</p>
          <p className={`${isDark ? `text-white` : `text-neutral`}`}>Location: 123 Marathon St, Runner City</p>

          {/* Social Media Icons */}
          
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={` mt-8 pt-4 text-center ${isDark ? `text-[#d69327]`:`text-neutral`}`}>
        <hr className="w-11/12 mx-auto border border-gray-500 mb-6"/>
        <p >&copy; {new Date().getFullYear()} Marathon Management. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
// className={`${isDark ? `text[#d69327]`:`text-gray-700`}`}
export default Footer;
