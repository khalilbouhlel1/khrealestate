import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaCreditCard,
  FaPaypal,
  FaCcVisa,
  FaCcMastercard,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';
import PropTypes from 'prop-types';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="block">
              <h2 className="text-3xl font-bold text-orange-600">
                KHledia Estate
              </h2>
            </Link>
            <p className="text-gray-600 text-sm">
              Khledia estate is a real estate company that offers a wide range of properties for sale and rent.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" Icon={FaFacebookF} />
              <SocialLink href="#" Icon={FaTwitter} />
              <SocialLink href="#" Icon={FaInstagram} />
              <SocialLink href="#" Icon={FaLinkedinIn} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900">Quick Links</h3>
            <ul className="space-y-4">
              <FooterLink to="/listings" text="listings" />
              <FooterLink to="/about" text="About Us" />
              <FooterLink to="/contact" text="Contact" />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900">Contact Us</h3>
            <ul className="space-y-4">
              <ContactInfo 
                Icon={FaEnvelope} 
                text="support@readsy.com" 
                href="mailto:support@readsy.com"
              />
              <ContactInfo 
                Icon={FaPhone} 
                text="+1 (555) 123-4567" 
                href="tel:+15551234567"
              />
              <ContactInfo 
                Icon={FaMapMarkerAlt} 
                text="Khledia, Ben arous, tunisia" 
              />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">
              Stay updated with our latest releases and real estate news.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 
                         focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                         text-gray-900 text-sm"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-orange-500 
                         text-white rounded-lg text-sm font-semibold
                         hover:shadow-lg transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-6">
            <PaymentIcon Icon={FaCreditCard} />
            <PaymentIcon Icon={FaPaypal} />
            <PaymentIcon Icon={FaCcVisa} />
            <PaymentIcon Icon={FaCcMastercard} />
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © {currentYear} kh. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components
const SocialLink = ({ href, Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-indigo-600 transition-colors duration-300"
  >
    <Icon className="w-4 h-4 text-white" />
  </a>
);

SocialLink.propTypes = {
  href: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
};

const FooterLink = ({ to, text }) => (
  <li>
    <Link
      to={to}
      className="text-sm text-gray-400 hover:text-indigo-600 transition-colors duration-300"
    >
      {text}
    </Link>
  </li>
);

FooterLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const ContactInfo = ({ Icon, text, href }) => (
  <li className="flex items-center space-x-2">
    <Icon className="w-4 h-4 text-gray-600" />
    <span className="text-gray-600">{text}</span>
  </li>
);

ContactInfo.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
};

const PaymentIcon = ({ Icon }) => (
  <div className="text-gray-400">
    <Icon className="w-8 h-8" />
  </div>
);

PaymentIcon.propTypes = {
  Icon: PropTypes.elementType.isRequired,
};

export default Footer;