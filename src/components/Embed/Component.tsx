import React from "react";

import type { SerializedEmbedNode as _SerializedEmbedNode } from "@/lexical-features/embedFeature/nodes/EmbedNode";
import { EmbedNodeData } from "@/lexical-features/embedFeature/nodes/EmbedNode";

import { getVideoEmbedUrl } from "@/utilities/getVideoEmbedUrl";

export type SerializedEmbedNode = _SerializedEmbedNode;

export type EmbedProps = {
  fields: EmbedNodeData;
};

export const Embed = (props: EmbedProps) => {
  const { fields } = props;
  const videoSrc = getVideoEmbedUrl(fields.url);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute left-0 top-0 size-full rounded-lg"
          src={videoSrc}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
