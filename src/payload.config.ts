import { postgresAdapter } from "@payloadcms/db-postgres";

import { buildConfig } from "payload";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

import { JobCategories } from "@/collections/JobCategory";
import { JobPostings } from "@/collections/JobPostings";
import { Media } from "@/collections/Media";
import { Pages } from "@/collections/Pages";
import { Users } from "@/collections/Users";
import { Footer } from "@/components/globals/Footer/config";
import { Header } from "@/components/globals/Header/config";
import { defaultLexical } from "@/fields/defaultLexical";
import { plugins } from "@/plugins";
import { getServerSideURL } from "@/utilities/getURL";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Icon: "/components/Logo/Logo#Logo",
        Logo: "/components/Logo/Logo#LogoWithText",
      },
      afterLogin: [
        "src/components/OrDivider#OrDivider",
        "src/components/GoogleOAuthLoginButton#GoogleOAuthLoginButton",
      ],
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
    /**
     * * The `push` option is used to automatically push schema changes to the database.
     * true (default) - automatically push schema changes to the database
     * false - don't automatically push schema changes to the database
     * set to false due to long reload times when making changes with push enabled
     * 
    */
    push: false,
  }),
  collections: [Pages, Media, Users, JobPostings, JobCategories],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [...plugins],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
