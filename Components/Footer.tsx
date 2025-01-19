import React from 'react';
import { Car, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black pt-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-4">
            <Car className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-white">
              © {currentYear} AutoShow
            </span>
          </div>

          {/* Quick Contact */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white">
            <a href="tel:+15551234567" className="flex items-center hover:text-blue-500">
              <Phone className="h-4 w-4 mr-2" />
              (555) 123-4567
            </a>
            <a href="mailto:contact@autoshow.com" className="flex items-center hover:text-blue-500">
              <Mail className="h-4 w-4 mr-2" />
              contact@autoshow.com
            </a>
          </div>

          {/* Essential Links */}
          <div className="flex space-x-4 text-sm text-gray-300">
            <a href="#" className="hover:text-blue-500">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:text-blue-500">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;