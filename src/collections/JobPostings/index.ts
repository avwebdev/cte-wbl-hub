import type { CollectionConfig } from "payload";

import { authenticated } from "@/access/authenticated";
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
import { slugField } from "@/fields/slug";
import { populatePublishedAt } from "@/hooks/populatePublishedAt";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";
import { getServerSideURL } from "@/utilities/getURL";
import { revalidateDelete, revalidateJobPosting } from "./hooks/revalidateOpportunity";

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
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "job-postings",
        });

        return `${getServerSideURL()}${path}`;
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "job-postings",
      });

      return `${getServerSideURL()}${path}`;
    },
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "state",
      type: "select",
      options: [
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
        { label: "Draft", value: "draft" },
      ],
      defaultValue: "open",
      required: true,
    },
    {
      name: "company",
      type: "text",
      required: true,
    },
    {
      name: "location",
      type: "text",
      required: false,
      admin: {
        placeholder: "e.g., San Francisco, Remote",
      },
    },
    {
      name: "employmentType",
      type: "select",
      options: [
        { label: "Full-time", value: "full-time" },
        { label: "Part-time", value: "part-time" },
        { label: "Contract", value: "contract" },
        { label: "Internship", value: "internship" },
      ],
      required: true,
    },
    {
      name: "salaryRange",
      type: "group",
      fields: [
        {
          name: "min",
          type: "number",
          required: false,
          admin: {
            placeholder: "Minimum salary",
          },
        },
        {
          name: "max",
          type: "number",
          required: false,
          admin: {
            placeholder: "Maximum salary",
          },
        },
        {
          name: "currency",
          type: "text",
          required: false,
          defaultValue: "USD",
        },
      ],
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "qualifications",
      type: "array",
      fields: [
        {
          name: "requirement",
          type: "text",
          required: true,
        },
      ],
      admin: {
        description: "List the required qualifications for the job.",
      },
    },
    {
      name: "applicationInstructions",
      type: "text",
      admin: {
        placeholder: "e.g., Send your resume to opportunities@example.com",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "jobCategory",
      type: "relationship",
      relationTo: "job-categories",
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
