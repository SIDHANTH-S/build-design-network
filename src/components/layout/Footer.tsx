
import React from "react";
import { Link } from "react-router-dom";
import { Construction, Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-skillink-blue text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Construction className="h-6 w-6" />
              <span className="text-xl font-bold">Skillink 24/7</span>
            </div>
            <p className="text-gray-300 text-sm">
              Connecting homeowners with verified professionals and quality materials for all construction needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/search" className="hover:text-white transition">Find Professionals</Link></li>
              <li><Link to="/materials" className="hover:text-white transition">Shop Materials</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition">How It Works</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/services/civil-engineering" className="hover:text-white transition">Civil Engineering</Link></li>
              <li><Link to="/services/interior-design" className="hover:text-white transition">Interior Design</Link></li>
              <li><Link to="/services/plumbing" className="hover:text-white transition">Plumbing Services</Link></li>
              <li><Link to="/services/electrical" className="hover:text-white transition">Electrical Work</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>support@skillink247.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link to="/contact">
                <button className="bg-skillink-teal hover:bg-skillink-teal-light text-white px-4 py-2 rounded-md transition">
                  Contact Support
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-700 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>© 2023 Skillink 24/7. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
