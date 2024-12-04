import React from "react";

import RichText from "@/components/RichText";
import type { Page } from "@/payload-types";

type LowImpactHeroType =
  | {
      children?: React.ReactNode;
      richText?: never;
    }
  | (Omit<Page["hero"], "richText"> & {
      children?: never;
      richText?: Page["hero"]["richText"];
    });

export const LowImpactHero: React.FC<LowImpactHeroType> = ({
  children,
  richText,
}) => {
  return (
    <div className="container mt-16">
      <div className="max-w-3xl">
        {children ||
          (richText && (
            <RichText
              className="[&>:is(h2,h3,h4,h5)]:mt-0 [&>:is(h2,h3,h4,h5)]:font-thin"
              content={richText}
              enableGutter={false}
            />
          ))}
      </div>
    </div>
  );
};
