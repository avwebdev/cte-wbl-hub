"use client";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { CMSLink } from "@/components/Link";
import { Logo } from "@/components/Logo/Logo";
import type { Header } from "@/payload-types";

import { useHeaderTheme } from "@/providers/HeaderTheme";

interface HeaderClientProps {
  header: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null);
  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();
  const navItems = header?.navItems || [];

  useEffect(() => {
    setHeaderTheme(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme]);

  return (
    <header
      className="container relative z-20 "
    >
      <div className="flex justify-between border-b border-border py-4">
        <Link href="/">
          <Logo
            loading="eager"
            priority="high"
          />
        </Link>
        <nav className="flex items-center gap-8">
          {navItems.map(({ link }, i) => {
            return <CMSLink key={i} {...link} appearance="link" />;
          })}
        </nav>
        <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 text-primary" />
        </Link>
      </div>
    </header>
  );
};
