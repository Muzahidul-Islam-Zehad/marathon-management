
const Footer = () => {
  return (
    <footer className="bg-base-200 py-8">
      <div className=" w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold text-primary mb-4">About Us</h2>
          <p className="text-neutral">
            Marathon Management is dedicated to organizing and managing
            world-class marathon events. Join us to experience the thrill of
            the race and achieve your personal best.
          </p>
        </div>


        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-bold text-primary mb-4">Contact Us</h2>
          <p className="text-neutral">
            Email: <a href="mailto:info@marathon.com" className="text-primary hover:underline">info@marathon.com</a>
          </p>
          <p className="text-neutral">Phone: +123-456-7890</p>
          <p className="text-neutral">Location: 123 Marathon St, Runner City</p>

          {/* Social Media Icons */}
          
        </div>
      </div>

      {/* Footer Bottom */}
      <div className=" mt-8 pt-4 text-center text-neutral ">
        <hr className="w-11/12 mx-auto border border-gray-500 mb-6"/>
        <p>&copy; {new Date().getFullYear()} Marathon Management. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
