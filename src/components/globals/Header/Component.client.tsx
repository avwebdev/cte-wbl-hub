"use client";

import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { CMSLink, resolveLink } from "@/components/Link";
import { Logo } from "@/components/Logo/Logo";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

import type { Header } from "@/payload-types";

import { useHeaderTheme } from "@/providers/HeaderTheme";

import "./index.css";
import { cn } from "@/utilities/cn";

interface HeaderClientProps {
  header: Header;
}

const NavLinks = ({
  navItems,
  COLOR_CLASSES,
  pathname,
}: {
  navItems: Header["navItems"];
  COLOR_CLASSES: string[];
  pathname: string;
}) => {
  navItems = navItems || [];

  return (
    <>
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className={cn(
              "text-base font-normal text-zinc-700 decoration-4 underline-offset-[18px]",
              resolveLink(link) === pathname ? "underline" : "",
              COLOR_CLASSES[i % COLOR_CLASSES.length],
            )}
          />
        );
      })}
    </>
  );
};

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  const [visible, setVisible] = useState<boolean>(true);
  const prevScrollPos = useRef<number>(0);

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > prevScrollPos.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      prevScrollPos.current = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const COLOR_CLASSES = ["decoration-blue-chill-700", "decoration-blaze-orange-500", "decoration-lima-600"];

  return (
    <header
      className={cn(
        "z-20 w-full bg-white/80 px-[3%] backdrop-blur-md transition-all duration-300 ease-in-out",
        {
          "sticky top-0 translate-y-0 opacity-100": visible,
          "opacity-0": !visible,
        },
      )}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between pb-1.5 pt-3 text-gray-700">
        <Link href="/" className="flex items-center gap-3">
          <Logo loading="eager" priority="high" className="size-6 align-middle" />
          <h1 className="shrink-0 align-baseline text-[1.6875rem]">WBL Hub</h1>
        </Link>
        <nav className="hidden items-center gap-6 md:flex md:gap-8 lg:gap-10">
          <NavLinks navItems={navItems} COLOR_CLASSES={COLOR_CLASSES} pathname={pathname} />
        </nav>
        <Link href="/search" className="hidden md:block">
          <span className="sr-only">Search</span>
          <Search className="size-6" />
        </Link>
        <nav className="flex shrink-0 items-center space-x-4 md:hidden">
          <Drawer direction="right">
            <DrawerTrigger className="md:hidden">
              <Menu className="size-6 shrink-0" />
            </DrawerTrigger>
            <DrawerContent className="bg-gray-50">
              <DrawerHeader>
                <DrawerTitle>Links</DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col gap-5 pt-3">
                <NavLinks navItems={navItems} COLOR_CLASSES={COLOR_CLASSES} pathname={pathname} />
              </div>
            </DrawerContent>
          </Drawer>
          <Link href="/search">
            <span className="sr-only">Search</span>
            <Search className="size-6" />
          </Link>
        </nav>
      </div>
    </header>
  );
};
