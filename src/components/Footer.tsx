import React from 'react';
import { Link } from 'react-router-dom';
import { ContactLink } from './ContactLink';
const linkClass = 'text-sm text-gray-500 hover:text-[#7A1220] transition-colors font-figtree';
export function Footer() {
  return (
    <footer className="bg-[#F9FAFB] border-t border-gray-250 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-left">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex items-center mb-6 group">
              <img
                src="/sunny_logo_large.svg"
                alt="SunnyRemit"
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-gray-500 font-light leading-relaxed mb-6 font-figtree">
              Kenya's trusted forex bureau and remittance partner. Licensed and
              regulated by the Central Bank of Kenya.
            </p>
            <div className="flex h-[3px] w-16">
              <span className="flex-1 bg-[#7A1220]" />
              <span className="flex-1 bg-[#B91C1C]" />
              <span className="flex-1 bg-[#006B3F]" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-6 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/forex" className={linkClass}>
                  Forex Exchange
                </Link>
              </li>
              <li>
                <Link to="/remittance" className={linkClass}>
                  Money Remittance
                </Link>
              </li>
              <li>
                <Link to="/remittance" className={linkClass}>
                  M-Pesa Transfers
                </Link>
              </li>
              <li>
                <Link to="/corporate" className={linkClass}>
                  Corporate Accounts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-6 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className={linkClass}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/corporate" className={linkClass}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/branches" className={linkClass}>
                  Branches
                </Link>
              </li>
              <li>
                <Link to="/blog" className={linkClass}>
                  Blog
                </Link>
              </li>
              <li>
                <a href="#contact" className={linkClass}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-6 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/terms" className={linkClass}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className={linkClass}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/aml-policy" className={linkClass}>
                  AML Policy
                </Link>
              </li>
              <li>
                <Link to="/legal" className={linkClass}>
                  Legal & Governance Hub
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Compliance Disclaimers */}
        <div className="pt-8 border-t border-gray-200 mb-8 space-y-3">
          <p className="text-[10px] sm:text-[11px] leading-relaxed text-gray-900 font-normal opacity-85 font-figtree">
            SunnyRemit is a registered trademark of Sunny Forex & Money Remittance Limited, a company incorporated in the Republic of Kenya. SunnyRemit is fully licensed and regulated by the Central Bank of Kenya (CBK) under the Central Bank of Kenya Act (Cap 491) and the Money Remittance Regulations, 2013, to conduct foreign exchange and international money transfer services.
          </p>
          <p className="text-[10px] sm:text-[11px] leading-relaxed text-gray-900 font-normal opacity-85 font-figtree">
            Disclaimer: International money transfers carry financial risks, including potential fraud. Users are strongly cautioned never to send funds to individuals they do not know or trust. SunnyRemit does not guarantee transactions initiated or finalized outside our authorized branches, websites, or partner platforms. All services are subject to customer due diligence (KYC), anti-money laundering (AML), and counter-terrorist financing (CTF) compliance screenings under the Proceeds of Crime and Anti-Money Laundering Act (POCAMLA).
          </p>
          <p className="text-[10px] sm:text-[11px] leading-relaxed text-gray-900 font-normal opacity-85 font-figtree">
            Safaricom, M-PESA, and their associated logos are registered trademarks of Safaricom PLC. All other trademarks, brand names, and logos displayed on this website are the property of their respective owners.
          </p>
        </div>

        <div className="pt-8 border-t border-gray-150 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 font-light font-figtree">
            © {new Date().getFullYear()} SunnyRemit Forex & Money Remittance Ltd. All rights
            reserved.
          </p>
          <a 
            href="https://www.centralbank.go.ke/bank-supervision/cbk-directory-of-licenced-money-remittance-providers/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A1220] group-hover:scale-110 transition-transform" />
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider font-figtree border-b border-dashed border-gray-300 group-hover:border-gray-500 transition-colors">
              CBK Licensed & Regulated
            </p>
          </a>
        </div>
      </div>
    </footer>);

}