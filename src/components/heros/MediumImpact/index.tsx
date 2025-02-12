"use client";
import React, { useEffect } from "react";

import { Media } from "@/components/Media";
import RichText from "@/components/RichText";
import type { Page } from "@/payload-types";
import { useHeaderTheme } from "@/providers/HeaderTheme";

export const MediumImpactHero: React.FC<Page["hero"]> = ({ media, richText, color }) => {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme("dark");
  });

  return (
    <div className="relative flex items-center justify-center text-white" data-theme="dark">
      <div className="relative z-10 mb-8 flex md:ml-3 md:items-start md:justify-start">
        <div className="w-full text-center">
          {richText && (
            <RichText
              className="mb-6 [&>:is(h2,h3,h4,h5)]:mt-0 [&>:is(h2,h3,h4,h5)]:font-thin"
              data={richText}
              enableGutter={false}
            />
          )}
        </div>
      </div>
      <div className="max-h-[60vh] min-h-[45vh] select-none">
        {media && typeof media === "object" && (
          <>
            <div className="absolute inset-0 opacity-75" style={{ backgroundColor: color }} />
            <Media
              fill
              imgClassName="max-h-[60vh] min-h-[45vh] -z-10 object-cover object-center"
              priority={false}
              loading="lazy"
              resource={media}
            />
            <div className="flex justify-center absolute bottom-0 inset-x-0 overflow-hidden">
              <svg
                className="min-w-[1412px]"
                preserveAspectRatio="none"
                viewBox="0 0 1412 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M756 0C368 0 0 20 0 20V0H756H1512V20C1512 20 1144 0 756 0Z"
                  fill="none"
                  className="text-white"
                />
                <path
                  d="M706 0C343.661 0 0 18.6667 0 18.6667V28H1412V18.6667C1412 18.6667 1068.34 0 706 0Z"
                  fill="currentColor"
                  className="text-white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 20.5333V18.6667C0 18.6667 343.661 0 706 0C1068.34 0 1412 18.6667 1412 18.6667V20.5333C1410.65 20.4631 1409.3 20.3919 1407.95 20.3211C1405.35 20.1845 1401.48 19.984 1396.43 19.7289C1386.33 19.2186 1371.49 18.4895 1352.56 17.6147C1314.68 15.8649 1260.41 13.5319 1194.81 11.1988C1063.62 6.53262 887.14 1.86667 706 1.86667C524.86 1.86667 348.384 6.53262 217.189 11.1988C151.593 13.5319 97.3191 15.8649 59.4449 17.6147C40.5078 18.4895 25.6709 19.2186 15.5687 19.7289C10.5176 19.984 6.6502 20.1845 4.04587 20.3211C2.69724 20.3919 1.34865 20.4631 0 20.5333Z"
                  fill="currentColor"
                  className="text-white"
                />
              </svg>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
