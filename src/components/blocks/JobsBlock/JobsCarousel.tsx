"use client";

import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel";
import { MapPin } from "lucide-react";
import { JobPosting } from "@/payload-types";
import RichText from "@/components/RichText";

export type JobsCarouselProps = {
  category: {
    title: string;
    description: string | null | undefined;
    jobs: JobPosting[];
  };
};

export function JobsCarousel({ category }: JobsCarouselProps) {
  return (
    <Carousel
      className="items-center space-y-6"
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent className="gap-6">
        {category.jobs.map((job) => {
          const { opportunityType, paidOrUnpaid } = job.about;

          const paidAvailable =
            opportunityType.includes("Apprenticeship Opportunity") ||
            (opportunityType.includes("Internship Opportunity") && paidOrUnpaid?.includes("Paid"));

          const unpaidAvailable =
            opportunityType.includes("Job Shadow Opportunity") ||
            (opportunityType.includes("Internship Opportunity") && paidOrUnpaid?.includes("Unpaid"));

          const paidStr = [unpaidAvailable && "Unpaid", paidAvailable && "Paid"].filter(Boolean).join(" / ");

          return (
            <CarouselItem key={job.id} className="p-4">
              <Card className="rounded-2xl bg-white drop-shadow-lg">
                <CardHeader>
                  <CardTitle className="text-blue-chill-600">{job.name}</CardTitle>
                  <CardDescription className="flex items-center text-base text-gray-700">
                    {job.place.subtitle}
                  </CardDescription>
                  <CardDescription className="flex items-center gap-1 text-base text-gray-700">
                    {job.place.city}
                    <MapPin className="size-5" />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Type: {job.about.opportunityType.join(" / ")}, {paidStr}
                  </p>
                  <div className="py-3">
                    <p>Job Description:</p>
                    <RichText data={job.about.description} enableGutter={false} />
                  </div>
                  <p>
                    {job.about.minimumAgeRequirement && `Minimum Age: ${job.about.minimumAgeRequirement} years old`}
                  </p>
                  <div className="py-3">
                    <p>Pathways:</p>
                    <ul className="list-disc pl-6">
                      {job.categories.map((pathway) => {
                        if (typeof pathway === "number") {
                          return false;
                        }

                        return <li key={pathway.title}>{pathway.title}</li>;
                      })}
                    </ul>
                  </div>
                  {/* <p className="mb-4 text-xl">
                  Status: {new Date(job.application.a).toLocaleDateString()}
                </p>
                <p className="text-xl">Description:</p>
                <RichText data={job.description} enableGutter={false} className="text-xl" /> */}
                </CardContent>
                {/* <CardFooter>
                      <p>Card Footer</p>
                    </CardFooter> */}
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <CarouselPrevious className="align-middle" />
      <CarouselNext className="align-middle" />
      <CarouselDots />
    </Carousel>
  );
}
