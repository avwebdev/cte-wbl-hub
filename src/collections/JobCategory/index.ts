import type { CollectionConfig } from "payload";

import { authenticated } from "@/access/authenticated";
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";

export const JobCategories: CollectionConfig<"job-categories"> = {
  slug: "job-categories",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "updatedAt"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      unique: true,
      admin: {
        placeholder: "e.g., Engineering, Marketing, Design",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: false,
      admin: {
        placeholder: "Optional description of the category",
      },
    },
    {
      name: "jobs / opportunities",
      type: "join",
      on: "job-category",
      collection: "job-postings",
    },
  ],
};
