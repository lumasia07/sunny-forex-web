import React from 'react';
import { Link } from 'react-router-dom';
import { ContactLink } from './ContactLink';
const linkClass = 'text-sm text-gray-500 hover:text-[#7A1220] transition-colors';
export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <img
                src="/logo-mark.png"
                alt=""
                aria-hidden="true"
                className="h-14 w-14 object-contain"
              />
              <span className="font-brand text-xl text-[#0E0E0E]">
                Sunny <span className="text-[#7A1220]">Remit</span>
              </span>
            </Link>
            <p className="text-sm text-[#0E0E0E]/75 font-normal leading-relaxed mb-6">
              Kenya's trusted forex bureau and remittance partner. Licensed and
              regulated by the Central Bank of Kenya.
            </p>
            <div className="flex h-[3px] w-16">
              <span className="flex-1 bg-[#0E0E0E]" />
              <span className="flex-1 bg-[#B91C1C]" />
              <span className="flex-1 bg-[#006B3F]" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#0E0E0E] mb-6 uppercase tracking-wider">
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
            <h4 className="text-sm font-semibold text-[#0E0E0E] mb-6 uppercase tracking-wider">
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
            <h4 className="text-sm font-semibold text-[#0E0E0E] mb-6 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@sunnyremit.com?subject=Terms%20of%20Service%20Request"
                  className={linkClass}>
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@sunnyremit.com?subject=Privacy%20Policy%20Request"
                  className={linkClass}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@sunnyremit.com?subject=AML%20Policy%20Request"
                  className={linkClass}>
                  AML Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400 font-light">
            © {new Date().getFullYear()} Sunny Remit Bureau Ltd. All rights
            reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A1220]" />
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              CBK Licensed & Regulated
            </p>
          </div>
        </div>
      </div>
    </footer>);

}