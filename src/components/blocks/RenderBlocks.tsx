import React, { Fragment } from "react";

import { CallToActionBlock } from "@/components/blocks/CallToAction/Component";
import { ContentBlock } from "@/components/blocks/Content/Component";
import { FormBlock } from "@/components/blocks/Form/Component";
import { MediaBlock } from "@/components/blocks/MediaBlock/Component";
import { JobsBlock } from "@/components/blocks/JobsBlock/Component";
import type { Page } from "@/payload-types";

const blockComponents = {
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  jobsBlock: JobsBlock,
};

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][]
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error */}
                  <Block {...block} />
                </div>
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
