import { Link } from 'react-router';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import HeartBridge from '../heartbridgelogo/HeartBridge';

const Footer = () => {
    return (
        <footer className="bg-slate-800 text-white mt-10">
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Logo & About */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                       <HeartBridge></HeartBridge>
                    </div>
                    <p className="text-sm">
                        HeartBridge is your trusted platform for finding your perfect life partner. Join us to build a bond that lasts forever.
                    </p>
                    <div className="flex gap-4 mt-4 text-red-600">
                        <FaFacebook className="hover:text-white cursor-pointer" />
                        <FaTwitter className="hover:text-white cursor-pointer" />
                        <FaInstagram className="hover:text-white cursor-pointer" />
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold text-red-600 mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-red-600 transition">Home</Link></li>
                        <li><Link to="/biodatas" className="hover:text-red-600 transition">Biodatas</Link></li>
                        <li><Link to="/about" className="hover:text-red-600 transition">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-red-600 transition">Contact</Link></li>
                        <li><Link to="/login" className="hover:text-red-600 transition">Login</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-xl font-semibold text-red-600 mb-4">Contact Info</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Email: support@heartbridge.com</li>
                        <li>Phone: +880-1234-567890</li>
                        <li>Address: Barisal, Bangladesh</li>
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="text-center text-sm py-4 bg-slate-900 text-slate-400">
                © {new Date().getFullYear()} HeartBridge. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
