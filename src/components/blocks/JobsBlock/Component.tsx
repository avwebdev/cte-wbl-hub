import React from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";

import type { JobPosting, JobsBlock as JobsBlockProps } from "@/payload-types";
import { unstable_cache } from "next/cache";
import { cn } from "@/utilities/cn";

import { JobsCarousel } from "./JobsCarousel";

async function getRecentApplications() {
  const now = new Date();
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(now.getMonth() - 2);
  const payload = await getPayload({ config: configPromise });

  const jobPostings = await payload.find({
    collection: "job-postings",
    limit: 1000,
    where: {
      "application.applicationOpens": {
        greater_than: twoMonthsAgo.toISOString(),
      },
    },
    depth: 2,
  });

  const jobsGroupedByCategories: Record<
    string,
    { title: string; description: string | null | undefined; jobs: JobPosting[] }
  > = {};

  jobPostings.docs.forEach((job) => {
    if (job.categories && Array.isArray(job.categories)) {
      job.categories.forEach((category) => {
        if (typeof category != "number") {
          if (!jobsGroupedByCategories[category.title]) {
            jobsGroupedByCategories[category.title] = {
              title: category.title,
              description: category.description,
              jobs: [],
            };
          }
          jobsGroupedByCategories[category.title].jobs.push(job);
        }
      });
    }
  });

  return Object.values(jobsGroupedByCategories);
}

const getRecentApplicationsCached = unstable_cache(getRecentApplications, ["getRecentApplications"]);

type Props = JobsBlockProps & {
  className?: string;
};

export const JobsBlock: React.FC<Props> = async (props) => {
  const { className } = props;

  const jobsGroupedByCategories = await getRecentApplications();

  console.log(jobsGroupedByCategories);

  return (
    <div className={cn("mx-[10%] -mt-8", className)}>
      {jobsGroupedByCategories.map((category) => (
        <div key={category.title} className="-space-y-4 mb-6 w-full col-span-3 col-start-1 m-0 mx-auto max-w-[66rem]">
          <h2 className="mb-4 text-2xl font-bold">{category.title}</h2>
          {category.description && <p className="pt-2 pb-4 text-gray-900">{category.description}</p>}

          <JobsCarousel category={category} />
        </div>
      ))}
    </div>
  );
};
