"use client";

import Logo from "@/components/Logo";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { FaPhone, FaSearch as IoSearch } from "react-icons/fa/index.js";
import { RS_Track } from '@/lib/rudderAnalytics';

// Tell the type system about the Segment object
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    analytics: any;
  }
}

//  child navigation link interface
export interface IChildNavigationLink {
  name: string;
  url: string;
}

// navigation link interface
export interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}

const Header = () => {

  // distructuring the main menu from menu object
  const { main }: { main: INavigationLink[] } = menu;
  const { settings } = config;

  // get current path
  const pathname = usePathname();

  // @MP reference the hidden checkbox which shows/hides the menu 
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {

    // scroll to top on route change
    window.scroll(0, 0);

    const handleClick = () => {

      if (checkboxRef.current && checkboxRef.current.checked) {
        setTimeout(() => {
          if (checkboxRef.current && checkboxRef.current) {
            checkboxRef.current.checked = false;
          }
        },
          100)
      }
    };

    document.addEventListener('mousedown', handleClick);

    RS_Track('rs_test', { any: 1 });

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };


  }, [pathname]);

  return (
    <header className={`header z-30 ${settings.sticky_header && "sticky top-0"}`}>

      <nav className="navbar container">

        <div className="order-0">
          <Logo />
        </div>

        <input id="nav-toggle" type="checkbox" className="hidden" ref={checkboxRef} />
        <label
          htmlFor="nav-toggle"
          className="order-3 cursor-pointer flex items-center lg:hidden text-dark  lg:order-1"
        >
          <svg
            id="show-button"
            className="h-6 fill-current block"
            viewBox="0 0 20 20"
          >
            <title>Menu Open</title>
            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
          </svg>
          <svg
            id="hide-button"
            className="h-6 fill-current hidden"
            viewBox="0 0 20 20"
          >
            <title>Menu Close</title>
            <polygon
              points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
              transform="rotate(45 10 10)"
            ></polygon>
          </svg>
        </label>

        <ul
          id="nav-menu"
          className="navbar-nav order-3 hidden w-full pb-6 lg:order-1 lg:flex lg:w-auto lg:space-x-2 lg:pb-0"
        >
          {main.map((menu, i) => (
            <React.Fragment key={`menu-${i}`}>
              {(

                <li className="nav-item">
                  {/* Link, showing the "selected page" */}
                  <Link
                    href={menu.url}
                    className={`nav-link block active ${(pathname === `${menu.url}/` || pathname === menu.url) &&
                      "text-primary"
                      }`}
                  >
                    {menu.name}
                  </Link>
                </li>
              )}
            </React.Fragment>
          ))}
          {settings.navigation_button.enable && (
            <li className="mt-4 inline-block lg:hidden">
              <Link
                className="btn btn-outline-primary btn-sm"
                href={settings.navigation_button.link}
              >
                {settings.navigation_button.label}
              </Link>
            </li>
          )}
        </ul>

        <div className="order-1 ml-auto flex items-center md:order-2 lg:ml-0">

          <button
            className="border-border text-dark hover:text-primary  mr-5 inline-block border-r pr-5 text-xl  "
            aria-label="search"
            data-search-trigger
            onClick={() => RS_Track('click-search', {})}
          >
            <IoSearch />
          </button>

          <button
            className="border-border text-dark hover:text-primary  mr-5 inline-block border-r pr-5 text-xl  "
            aria-label="phone"
            data-phone-trigger
            onClick={() => RS_Track('click-phone', {})}
          >
            <a href="tel:+44-7480-488-209">
              <FaPhone />
            </a>

          </button>

          <Link
            className="btn btn-outline-primary btn-sm hidden lg:inline-block"
            href={settings.navigation_button.link}
          >{settings.navigation_button.label}</Link>





        </div>
      </nav>

    </header>
  );
};

export default Header;
