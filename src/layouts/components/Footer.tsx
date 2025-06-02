"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import Social from "@/components/Social";

//import menu from "@/config/menu.json";
import social from "@/config/social.json";

const Footer = () => {

  return (
    <footer className="bg-theme-light ">
      <div className="container">
        <div className="row items-center py-10">
          <div className="mb-8 text-center lg:col-3 lg:mb-0 lg:text-left">
            <ul className="text-sm text-gray-500 flex flex-wrap justify-center gap-4">
              <li>
                <Link href="/privacy-policy" className="hover:text-gray-700 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-gray-700 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-8 text-center lg:col-6 lg:mb-0">
            <Logo />
          </div>
          <div className="mb-8 text-center lg:col-3 lg:mb-0 lg:mt-0 lg:text-right">
            <Social source={social.main} className="social-icons" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
