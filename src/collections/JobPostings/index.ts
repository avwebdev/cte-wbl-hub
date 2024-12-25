import type { CollectionConfig } from "payload";

import { authenticated } from "@/access/authenticated";
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
import { slugField } from "@/fields/slug";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";
import { getServerSideURL } from "@/utilities/getURL";
import { revalidateDelete, revalidateJobPosting } from "./hooks/revalidateOpportunity";
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

export const JobPostings: CollectionConfig<"job-postings"> = {
  slug: "job-postings",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ["title", "slug", "status", "updatedAt"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "place",
      type: "group",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "subtitle",
          type: "text",
          required: true,
          admin: {
            placeholder: "e.g., Awards Manufacturer, Restaurant",
          },
        },
        {
          name: "city",
          type: "text",
          required: true,
          admin: {
            placeholder: "e.g., San Francisco",
          },
        },
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "images",
          type: "array",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              required: false,
            },
          ],
        },
      ],
    },
    {
      name: "description",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      required: true,
    },
    {
      name: "hoursDescription",
      type: "text",
      required: true,
      admin: {
        description: "Description of the hours (keep this text for extra flexibility)",
      },
    },
    {
      name: "applicationTimeline",
      type: "group",
      fields: [
        {
          name: "applicationOpens",
          type: "date",
          required: true,
          admin: {
            description: "When the application opens or is coming soon",
          },
        },
      ],
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "job-categories",
      hasMany: true,
      required: true,
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateJobPosting],
    beforeChange: [populatePublishedAt],
    beforeDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
};
