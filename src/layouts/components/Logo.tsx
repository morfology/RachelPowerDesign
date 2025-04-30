"use client";

import config from "@/config/config.json";
//import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Logo = ({ src }: { src?: string }) => {
  // destructuring items from config object
  const {
    logo,
    logo_width,
    logo_height,
    logo_text,
    title,
  }: {
    logo: string;
    logo_width: string;
    logo_height: string;
    logo_text: string;
    title: string;
  } = config.site;

  //const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const resolvedLogo = logo;
  const logoPath = src ? src : resolvedLogo;

  return (
    <Link href="/" className="navbar-brand inline-block">
      {logoPath ? (
        <Image
          width={Number(logo_width.replace("px", "")) * 2}
          height={Number(logo_height.replace("px", "")) * 2}
          src={logoPath + ''}
          alt={title}
          priority
          style={{
            height: Number(logo_height.replace("px", "")) + "px",
            width: Number(logo_width.replace("px", "")) + "px",
          }}
        />
      ) : logo_text ? (
        logo_text
      ) : (
        title
      )}
    </Link>
  );
};

export default Logo;
