import { revalidatePath, revalidateTag } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import type { JobPosting } from "@/payload-types";

export const revalidateJobPosting: CollectionAfterChangeHook<JobPosting> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === "published") {
      const path = `/job-posting/${doc.slug}`;

      payload.logger.info(`Revalidating job posting at path: ${path}`);

      revalidatePath(path);
      revalidateTag("job-posting-sitemap");
      revalidateTag("getRecentApplications");
    }

    // If the job posting was previously open and now is not, revalidate the old path
    if (previousDoc?._status === "published" && doc._status !== "published") {
      const oldPath = `/job-posting/${previousDoc.slug}`;

      payload.logger.info(`Revalidating old job posting at path: ${oldPath}`);

      revalidatePath(oldPath);
      revalidateTag("job-posting-sitemap");
      revalidateTag("getRecentApplications");
    }
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<JobPosting> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/job-posting/${doc.slug}`;

    revalidatePath(path);
    revalidateTag("job-posting-sitemap");
    revalidateTag("getRecentApplications");
  }

  return doc;
};
