"use client";
import React, { useEffect } from "react";

import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";
import { Button } from "@/components/ui/button";

import type { Page } from "@/payload-types";
import { useHeaderTheme } from "@/providers/HeaderTheme";

export const HighImpactHero: React.FC<Page["hero"]> = ({
  links,
  media,
  richText,
  color,
}) => {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme("dark");
  });

  return (
    <div
      className="relative flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="container relative z-10 mb-8 flex md:ml-3 md:items-start md:justify-start">
        <div className="max-w-[50rem] text-center md:text-left">
          {richText && (
            <RichText
              className="mb-6 [&>:is(h2,h3,h4,h5)]:mt-0 [&>:is(h2,h3,h4,h5)]:font-thin"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <Button>
                      <CMSLink {...link} appearance="inline" />
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="max-h-[90vh] min-h-[85vh] select-none">
        {media && typeof media === "object" && (
          <>
            <div
              className="clip-slant absolute inset-0 opacity-75"
              style={{ backgroundColor: color }}
            />
            <Media
              fill
              imgClassName="-z-10 object-cover object-center clip-slant"
              priority={false}
              loading="lazy"
              resource={media}
            />
          </>
        )}
      </div>
    </div>
  );
};
