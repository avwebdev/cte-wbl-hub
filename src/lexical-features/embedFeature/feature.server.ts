import { createServerFeature } from "@payloadcms/richtext-lexical";
import type { Field, TextField } from "payload";

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
      {
        node: EmbedNode,
      },
    ],
    generateSchemaMap: ({ schemaMap }) => {
      const fields = [urlField];
      schemaMap.set("fields", { fields });

      return schemaMap;
    },
  },
  key: "embed",
});
