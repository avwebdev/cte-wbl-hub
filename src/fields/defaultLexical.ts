import {
  BoldFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  ParagraphFeature,
  UnderlineFeature,
  UploadFeature,
  UnorderedListFeature,
  OrderedListFeature,
} from "@payloadcms/richtext-lexical";
import type { Config } from "payload";
import { EmbedFeature } from "@/lexical-features/embedFeature/feature.server";

export const defaultLexical: Config["editor"] = lexicalEditor({
  features: () => {
    return [
      ParagraphFeature(),
      UnderlineFeature(),
      BoldFeature(),
      ItalicFeature(),
      LinkFeature({
        enabledCollections: ["pages"],
        fields: ({ defaultFields }) => {
          const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
            if ("name" in field && field.name === "url") return false;
            return true;
          });

          return [
            ...defaultFieldsWithoutUrl,
            {
              name: "url",
              type: "text",
              admin: {
                condition: ({ linkType }) => linkType !== "internal",
              },
              label: ({ t }) => t("fields:enterURL"),
              required: true,
            },
          ];
        },
      }),
      UploadFeature(),
      EmbedFeature(),
      UnorderedListFeature(),
      OrderedListFeature(),
    ];
  },
});
