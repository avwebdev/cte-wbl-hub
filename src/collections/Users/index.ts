import type { CollectionConfig } from "payload";

import { authenticated } from "@/access/authenticated";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["name", "email"],
    useAsTitle: "name",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "sub",
      type: "text",
      index: true,
      access: {
        read: () => true,
        create: () => false,
        update: () => false,
      },
      admin: {
        readOnly: true,
      },
    }
  ],
  timestamps: true,
};
