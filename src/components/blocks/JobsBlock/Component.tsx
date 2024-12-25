import React from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import RichText from "@/components/RichText";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import type { JobPosting, JobsBlock as JobsBlockProps } from "@/payload-types";
import { unstable_cache } from "next/cache";
import { cn } from "@/utilities/cn";

async function getRecentApplications() {
  const now = new Date();
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(now.getMonth() - 2);
  const payload = await getPayload({ config: configPromise });

  const jobPostings = await payload.find({
    collection: "job-postings",
    limit: 1000,
    where: {
      "applicationTimeline.applicationOpens": {
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
    <div className={cn("mx-[10%] grid grid-cols-1 gap-12 p-6 lg:grid-cols-2", className)}>
      {jobsGroupedByCategories.map((category) => (
        <div key={category.title} className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">{category.title}</h2>
          {category.description && <p className="mb-6 text-gray-700">{category.description}</p>}

          <Carousel className="space-y-6">
            <CarouselContent className="gap-6">
              {category.jobs.map((job) => (
                <CarouselItem key={job.id} className="p-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{job.title}</CardTitle>
                      <CardDescription>
                        {job.place.name} - {job.place.subtitle}
                      </CardDescription>
                      <CardDescription>{job.place.city}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RichText data={job.description} enableGutter={false} className="mb-4 text-gray-700" />
                      <p className="text-sm text-gray-500">
                        Opens: {new Date(job.applicationTimeline.applicationOpens).toLocaleDateString()}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <p>Card Footer</p>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ))}
    </div>
  );
};
