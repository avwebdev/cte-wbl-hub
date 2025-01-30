import type { CollectionConfig } from "payload";

import { authenticated } from "@/access/authenticated";
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
import { slugField } from "@/fields/slug";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
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
    name: true,
    slug: true,
  },
  admin: {
    defaultColumns: ["name", "slug", "updatedAt"],
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "place",
      type: "group",
      fields: [
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
            placeholder: "e.g., San Francisco, Pleasanton",
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
      name: "about",
      type: "group",
      fields: [
        {
          name: "opportunityType",
          type: "select",
          hasMany: true,
          options: ["Job Shadow Opportunity", "Internship Opportunity", "Apprenticeship Opportunity"],
          required: true,
        },
        {
          name: "paidOrUnpaid",
          type: "select",
          hasMany: true,
          options: ["Paid", "Unpaid"],
          required: true,
          admin: {
            condition: (data) => {
              if (data.about.opportunityType?.includes("Internship Opportunity")) {
                return true;
              } else {
                return false;
              }
            },
          },
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
            description: "Description of the hours (text for extra flexibility)",
          },
        },
        {
          name: "minimumAgeRequirement",
          type: "number",
          admin: {
            description: "Minimum Age Requirement",
          },
        },
      ],
    },
    {
      name: "application",
      type: "group",
      fields: [
        {
          name: "applicationOpens",
          type: "date",
          required: false,
          admin: {
            description: "When the application opens",
            placeholder: "Select a date",
          },
        },
        {
          name: "applicationCloses",
          type: "date",
          required: false,
          admin: {
            description: "When the application closes",
            placeholder: "Select a date",
          },
        },
        {
          name: "applicationLink",
          type: "text",
          admin: {
            description: "Link to the application / directions on how to apply",
          },
          validate: (value) => {
            const urlPattern =
              /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

            if (value == "" || value == null || (value && urlPattern.test(value))) {
              return true;
            } else {
              return "Please enter a valid URL.";
            }
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
    ...slugField("name"),
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
