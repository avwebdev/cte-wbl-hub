import React from "react";
import RichText from "@/components/RichText";

import type { ContentBlock as ContentBlockProps } from "@/payload-types";
import { cn } from "src/utilities/cn";

import { CMSLink } from "../../components/Link";

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props;

  const colsSpanClasses = {
    full: "12",
    half: "6",
    oneThird: "4",
    twoThirds: "8",
  };

  return (
    <div className="mx-auto my-16 w-[80vw] max-w-screen-md">
      <div className="grid grid-cols-4 gap-x-16 gap-y-8 lg:grid-cols-12">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col;

            return (
              <div
                className={cn(
                  `col-span-4 lg:col-span-${colsSpanClasses[size!]}`,
                  {
                    "md:col-span-2": size !== "full",
                  },
                )}
                key={index}
              >
                {richText && (
                  <RichText
                    className={cn(
                      "[&>h2]:text-blue-chill-700 [&>h4]:text-blaze-orange-500",
                      "[&>h2]:mb-3 [&>h2]:mt-0 [&>h4]:mb-1",
                      "[&>h2]:text-4xl [&>h4]:text-xl",
                      "[&>h2]:font-medium [&>h4]:font-medium [&>h4]:capitalize",
                    )}
                    content={richText}
                    enableGutter={false}
                  />
                )}

                {enableLink && <CMSLink {...link} />}
              </div>
            );
          })}
      </div>
    </div>
  );
};
