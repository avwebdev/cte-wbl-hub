import { createNode, createServerFeature } from "@payloadcms/richtext-lexical";
import type { TextField } from "payload";

import { EmbedNode } from "./nodes/EmbedNode";

const urlField: TextField = {
  name: "url",
  type: "text",
  required: true,
};

export const EmbedFeature = createServerFeature({
  feature: {
    ClientFeature:
      "/lexical-features/embedFeature/feature.client#EmbedFeatureClient",
    nodes: [
      createNode({
        converters: {
          html: {
            nodeTypes: ["EmbedNode"],
            converter: async ({ node }) => {
              const { url } = node.fields;
              return `<iframe src="https://www.youtube.com/embed/${url.split(
                "v="
              )[1]}" />`;
            }
          }
        },
        node: EmbedNode,
      }),
    ],
    generateSchemaMap: ({ schemaMap }) => {
      const fields = [urlField];
      schemaMap.set("fields", { fields });

      return schemaMap;
    },
  },
  key: "embed",
});
