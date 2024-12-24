
const Footer = () => {
  return (
    <footer className="bg-base-200 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold text-primary mb-4">About Us</h2>
          <p className="text-neutral">
            Marathon Management is dedicated to organizing and managing
            world-class marathon events. Join us to experience the thrill of
            the race and achieve your personal best.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold text-primary mb-4">Quick Links</h2>
          <ul className="text-neutral space-y-2">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/marathons" className="hover:underline">
                Upcoming Marathons
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:underline">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
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
          <div className="flex space-x-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral hover:text-primary"
            >
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral hover:text-primary"
            >
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral hover:text-primary"
            >
              <i className="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-neutral mt-8 pt-4 text-center text-neutral">
        <p>&copy; {new Date().getFullYear()} Marathon Management. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
