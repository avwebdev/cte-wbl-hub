import Image from "next/image";
import React from "react";

import RichText from "@/components/RichText";
import type { Footer as FooterType } from "@/payload-types";

import WebDevLogo from "/public/avweb.png";

import { getCachedGlobal } from "@/utilities/getGlobals";

export async function Footer() {
  const footer: FooterType = await getCachedGlobal("footer", 1)();

  const { richText } = footer;

  return (
    <footer className="relative bottom-0 left-0 w-full">
      <div className="bg-blue-chill-700 text-black">
        <div className="flex items-center justify-center py-8 text-center">
          {richText && <RichText data={richText} enableGutter={false} />}
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
