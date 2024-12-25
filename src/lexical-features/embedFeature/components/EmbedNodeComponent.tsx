import "./index.scss";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Button } from "@payloadcms/ui";
import { $getNodeByKey } from "lexical";
import React, { useCallback } from "react";

import { getVideoEmbedUrl } from "@/utilities/getVideoEmbedUrl";
import { EmbedNodeData, OPEN_EMBED_DRAWER_COMMAND } from "../nodes/EmbedNode";

type Props = {
  data: EmbedNodeData;
  nodeKey: string;
};

const baseClass = "embed-node";

export const EmbedNodeComponent: React.FC<Props> = (props) => {
  const { data, nodeKey } = props;
  const [editor] = useLexicalComposerContext();

  const videoSrc = getVideoEmbedUrl(data.url);

  const removeEmbed = useCallback(() => {
    editor.update(() => {
      const foundNode = $getNodeByKey(nodeKey);
      if (foundNode) {
        foundNode.remove();
      }
    });
  }, [editor, nodeKey]);

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__controls`}>
        <p className={`${baseClass}__urlDisplay`}>{data.url}</p>
        <div className={`${baseClass}__buttons`}>
          <Button
            buttonStyle="icon-label"
            className={`${baseClass}__swapButton`}
            el="div"
            icon="swap"
            onClick={(e) => {
              editor.dispatchCommand(OPEN_EMBED_DRAWER_COMMAND, {
                data,
                nodeKey,
              });
            }}
            round
            tooltip={"Swap Embed"}
          />
          <Button
            buttonStyle="icon-label"
            className={`${baseClass}__removeButton`}
            icon="x"
            onClick={(e) => {
              e.preventDefault();
              removeEmbed();
            }}
            round
            tooltip="Remove Embed"
          />
        </div>
      </div>
      <iframe
        // width="560"
        // height="315"
        className="size-full"
        src={videoSrc}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
};
