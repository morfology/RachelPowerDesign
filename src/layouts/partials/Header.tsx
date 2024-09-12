"use client";

import Logo from "@/components/Logo";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import SegmentHTML from 'dangerously-set-html-content';
import { FaSearch as IoSearch } from "react-icons/fa/index.js";
import { FaPhone } from "react-icons/fa/index.js";
import { RS_Track } from '@/lib/rudderAnalytics';

// Tell the type system about the Segment object
declare global {
  interface Window {
      analytics:any;
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
  const { navigation_button, settings } = config;
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

    RS_Track('rs_test', {any: 1});

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };


  }, [pathname]);

  return (
    <header
      className={`header z-30 ${settings.sticky_header && "sticky top-0"}`}
    >

      {/** Using the snippet is the recommended approach of possible */}
      <SegmentHTML html={`<script>` +
        `!function(){var i="analytics",analytics=window[i]=window[i]||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){if(window[i].initialized)return window[i][e].apply(window[i],arguments);var n=Array.prototype.slice.call(arguments);if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){var c=document.querySelector("link[rel='canonical']");n.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,p:location.pathname,u:location.href,s:location.search,t:document.title,r:document.referrer})}n.unshift(e);analytics.push(n);return analytics}};for(var n=0;n<analytics.methods.length;n++){var key=analytics.methods[n];analytics[key]=analytics.factory(key)}analytics.load=function(key,n){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.setAttribute("data-global-segment-analytics-key",i);t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r);analytics._loadOptions=n};analytics._writeKey="saYBHnKjyZtuwqR9t2ijXvwJoK9g6x9q";;analytics.SNIPPET_VERSION="5.2.0";` +
        `analytics.load("saYBHnKjyZtuwqR9t2ijXvwJoK9g6x9q");` + 
        `analytics.page();` +
      `}}();` + 
      `</script>`
      } />

      <nav className="navbar container">
        {/* logo */}
        <div className="order-0">
          <Logo />
        </div>
        {/* navbar toggler @MP closes menu */}
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

        {/* navbar menu */}
        <ul
          id="nav-menu"
          className="navbar-nav order-3 hidden w-full pb-6 lg:order-1 lg:flex lg:w-auto lg:space-x-2 lg:pb-0 xl:space-x-8"
        >
          {main.map((menu, i) => (
            <React.Fragment key={`menu-${i}`}>
              {(
              
                <li className="nav-item">
                {/* Link, showing the "selected page" */}
                <Link
                    href={menu.url}
                    className={`nav-link block active ${
                      (pathname === `${menu.url}/` || pathname === menu.url) &&
                      "text-primary"
                    }`}
                  >
                    {menu.name}
                  </Link>
                </li>
              )}
            </React.Fragment>
          ))}
          {navigation_button.enable && (
            <li className="mt-4 inline-block lg:hidden">
              <Link
                className="btn btn-outline-primary btn-sm"
                href={navigation_button.link}
              >
                {navigation_button.label}
              </Link>
            </li>
          )}
        </ul>
        <div className="order-1 ml-auto flex items-center md:order-2 lg:ml-0">
        {settings.search && (
            <button
              className="border-border text-dark hover:text-primary  mr-5 inline-block border-r pr-5 text-xl  "
              aria-label="search"
              data-search-trigger
              onClick={() => window.analytics.track('click-search', {})}
            >
              <IoSearch />
            </button>
          )}
          {(
            <button
              className="border-border text-dark hover:text-primary  mr-5 inline-block border-r pr-5 text-xl  "
              aria-label="phone"
              data-phone-trigger
              onClick={() => window.analytics.track('click-phone', {})}
            >
            <a href="tel:+44-7480-488-209">
            <FaPhone />
            </a>          

            </button>
          )}
          {/* <ThemeSwitcher className="mr-5" /> */}
          {navigation_button.enable && (
            <Link
              className="btn btn-outline-primary btn-sm hidden lg:inline-block"
              href={navigation_button.link}
            >
              {navigation_button.label}
            </Link>
          )}
        </div>
      </nav>

      {/* <div
        className="h-screen bg-no-repeat bg-cover" 
        style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/new/fluid/city/018.jpg')"}}>
        
      </div> */}
    </header>
  );
};

export default Header;
