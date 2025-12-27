import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-600 mr-2"></div>
              <span className="font-heading text-xl">name</span>
            </div>
            <p className="text-sm text-gray-400 font-paragraph">
              Building the future with innovative IT solutions and expertise.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-heading text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors font-paragraph">Solutions</Link></li>
              <li><Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors font-paragraph">Features</Link></li>
              <li><Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors font-paragraph">Pricing</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors font-paragraph">Consulting</Link></li>
              <li><Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors font-paragraph">Development</Link></li>
              <li><Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors font-paragraph">Support</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors font-paragraph">About</Link></li>
              <li><Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors font-paragraph">Careers</Link></li>
              <li><Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors font-paragraph">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-sm text-gray-400 text-center font-paragraph">
            © {new Date().getFullYear()} name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
