import type { Metadata } from "next/types";

import { getPayload } from "payload";
import React from "react";
import configPromise from "@payload-config";
import PageClient from "./page.client";

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {

  return (
    <div className="py-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose max-w-none dark:prose-invert">
          <h1 className="sr-only">Search</h1>
        </div>
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: "Payload Website Template Search",
  };
}
