import { createNode, createServerFeature } from "@payloadcms/richtext-lexical";
import type { FieldSchemaMap, TextField } from "payload";

import { getVideoEmbedUrl } from "@/utilities/getVideoEmbedUrl";
import { EmbedNode } from "./nodes/EmbedNode";

const urlField: TextField = {
  name: "url",
  type: "text",
  required: true,
};

export const EmbedFeature = createServerFeature({
  feature: {
    ClientFeature: "/lexical-features/embedFeature/feature.client#EmbedFeatureClient",
    nodes: [
      createNode({
        converters: {
          html: {
            nodeTypes: ["EmbedNode"],
            converter: async ({ node }) => {
              const { url } = node.fields;

              return getVideoEmbedUrl(url);
            },
          },
        },
        node: EmbedNode,
      }),
    ],
    generateSchemaMap: ({ schemaMap }) => {
      const newSchemaMap: FieldSchemaMap = new Map();

      const fields = [urlField];
      newSchemaMap.set("fields", { fields });

      return newSchemaMap;
    },
  },
  key: "embed",
});
