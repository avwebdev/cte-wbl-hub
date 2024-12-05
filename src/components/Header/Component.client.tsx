"use client";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { CMSLink, resolveLink } from "@/components/Link";
import { Logo } from "@/components/Logo/Logo";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

import type { Header } from "@/payload-types";

import { useHeaderTheme } from "@/providers/HeaderTheme";

import "./index.css";
import { cn } from "@/utilities/cn";

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

  const COLOR_CLASSES = [
    "text-blue-chill-700",
    "text-blaze-orange-500",
    "text-lima-600",
  ];

  return (
    <header className="relative z-20 w-full px-[3%]">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between pb-1.5 pt-3 text-gray-700">
        <Link href="/" className="flex items-center gap-3">
          <Logo
            loading="eager"
            priority="high"
            className="size-6 align-middle"
          />
          <h1 className="shrink-0 align-baseline text-[1.6875rem]">WBL Hub</h1>
        </Link>
        <nav className="flex items-center gap-6 md:gap-8 lg:gap-10">
          {navItems.map(({ link }, i) => {
            return (
              <CMSLink
                key={i}
                {...link}
                appearance="link"
                className={cn(
                  "text-base text-[#454545] decoration-4 underline-offset-[18px]",
                  resolveLink(link) === pathname ? "underline" : "",
                  COLOR_CLASSES[i % COLOR_CLASSES.length],
                )}
              />
            );
          })}
        </nav>
        <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="size-6" />
        </Link>
      </div>
    </header>
  );
};
