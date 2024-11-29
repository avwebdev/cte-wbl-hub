import Image from "next/image";
import Link from "next/link";
import React from "react";

import { CMSLink } from "@/components/Link";
import RichText from "@/components/RichText";
import { Logo } from "@/components/Logo/Logo";
import type { Footer as FooterType } from "@/payload-types";

import WebDevLogo from "/public/avweb.png";

import { getCachedGlobal } from "@/utilities/getGlobals";

export async function Footer() {
  const footer: FooterType = await getCachedGlobal("footer", 1)();

  const { richText } = footer;

  return (
    <footer>
      <div className="border-t border-border bg-[#0096A0] text-white dark:bg-card">
        <div className="container flex flex-col gap-8 py-8 md:flex-row md:justify-between">
          <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center">
            {richText && (
              <RichText
                className="mb-6"
                content={richText}
                enableGutter={false}
              />
            )}
          </div>
        </div>
      </div>
      <div className="prose flex max-w-none items-center justify-center gap-3 bg-black py-3 text-white">
        <Image
          src={WebDevLogo}
          alt="AV Web Dev logo"
          width={55}
          className="m-0"
        />
        <h2 className="m-0 font-light uppercase tracking-wider">
          Created by AV Web Dev
        </h2>
      </div>
    </footer>
  );
}
